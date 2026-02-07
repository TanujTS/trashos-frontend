"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types & Interfaces
// ============================================================================

type CameraFacing = "user" | "environment";

interface CapturedImage {
    blob: Blob;
    base64: string;
    width: number;
    height: number;
}

interface CameraModuleProps {
    /** Aspect ratio of the camera frame (e.g., "4/3", "16/9", "1/1") */
    aspectRatio?: string;
    /** Width of the container - can be any CSS value */
    width?: string;
    /** Height of the container - can be any CSS value (ignored if aspectRatio is set) */
    height?: string;
    /** Size of the corner brackets in pixels */
    cornerSize?: number;
    /** Thickness of the corner bracket lines in pixels */
    strokeWidth?: number;
    /** Color of the corner brackets and UI elements */
    accentColor?: string;
    /** Background color when camera is loading */
    backgroundColor?: string;
    /** Whether to show the center crosshair */
    showCrosshair?: boolean;
    /** Size of the crosshair in pixels */
    crosshairSize?: number;
    /** Initial camera facing mode */
    initialFacing?: CameraFacing;
    /** Callback when an image is captured */
    onCapture?: (image: CapturedImage) => void;
    /** Callback for form submission with image */
    onSubmit?: (image: CapturedImage) => void;
    /** Callback when camera error occurs */
    onError?: (error: Error) => void;
    /** Additional className for the container */
    className?: string;
    /** Image quality for capture (0-1) */
    captureQuality?: number;
    /** Whether to mirror the preview (for front camera) */
    mirrorFrontCamera?: boolean;
    /** Padding inside the corner brackets */
    framePadding?: number;
}

// ============================================================================
// Camera Status Types
// ============================================================================

type CameraStatus =
    | "idle"
    | "requesting"
    | "active"
    | "error"
    | "denied"
    | "not-supported";

// ============================================================================
// Camera Module Component
// ============================================================================

export const CameraModule: React.FC<CameraModuleProps> = ({
    aspectRatio = "1/1",
    width = "100%",
    height,
    cornerSize = 40,
    strokeWidth = 3,
    accentColor = "#3D3D3D",
    backgroundColor = "#EDFCDE",
    showCrosshair = true,
    crosshairSize = 24,
    initialFacing = "environment",
    onCapture,
    onSubmit,
    onError,
    className,
    captureQuality = 0.92,
    mirrorFrontCamera = true,
    framePadding = 16,
}) => {
    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const mountedRef = useRef(true);

    // State
    const [status, setStatus] = useState<CameraStatus>("idle");
    const [facing, setFacing] = useState<CameraFacing>(initialFacing);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);

    // ============================================================================
    // Camera Stream Management
    // ============================================================================

    const stopStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
    }, []);

    const startCamera = useCallback(async (facingMode: CameraFacing) => {
        if (!mountedRef.current) return;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setStatus("not-supported");
            setErrorMessage("Camera not supported on this device/browser");
            onError?.(new Error("Camera not supported"));
            return;
        }

        setStatus("requesting");
        stopStream();

        try {
            const constraints: MediaStreamConstraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 1280 },
                },
                audio: false,
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (!mountedRef.current) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

        } catch (err) {
            if (!mountedRef.current) return;

            const error = err as Error;

            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                setStatus("denied");
                setErrorMessage("Camera permission denied. Please allow camera access.");
            } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
                setStatus("error");
                setErrorMessage("No camera found on this device.");
            } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
                setStatus("error");
                setErrorMessage("Camera is in use by another application.");
            } else {
                setStatus("error");
                setErrorMessage("Unable to access camera. Please try again.");
            }

            onError?.(error);
        }
    }, [stopStream, onError]);

    const handleVideoLoaded = useCallback(() => {
        if (mountedRef.current) {
            setStatus("active");
        }
    }, []);

    // ============================================================================
    // Camera Controls
    // ============================================================================

    const capturePhoto = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || status !== "active") return;

        try {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            if (!ctx) throw new Error("Canvas context not available");

            // Set canvas to square aspect ratio
            const size = Math.min(video.videoWidth, video.videoHeight);
            canvas.width = size;
            canvas.height = size;

            // Calculate crop offset to center
            const offsetX = (video.videoWidth - size) / 2;
            const offsetY = (video.videoHeight - size) / 2;

            // Handle mirroring for front camera
            if (facing === "user" && mirrorFrontCamera) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            }

            // Draw the cropped video frame
            ctx.drawImage(video, offsetX, offsetY, size, size, 0, 0, size, size);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            const base64 = canvas.toDataURL("image/jpeg", captureQuality);

            const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (b) => {
                        if (b) resolve(b);
                        else reject(new Error("Failed to create blob"));
                    },
                    "image/jpeg",
                    captureQuality
                );
            });

            const image: CapturedImage = {
                blob,
                base64,
                width: canvas.width,
                height: canvas.height,
            };

            setCapturedImage(image);
            onCapture?.(image);

        } catch (err) {
            onError?.(err as Error);
        }
    }, [status, facing, mirrorFrontCamera, captureQuality, onCapture, onError]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const img = new Image();
            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = reject;
                img.src = base64;
            });

            const image: CapturedImage = {
                blob: file,
                base64,
                width: img.width,
                height: img.height,
            };

            setCapturedImage(image);
            onCapture?.(image);

        } catch (err) {
            onError?.(err as Error);
        }
    };

    const handleSubmit = () => {
        if (capturedImage) {
            onSubmit?.(capturedImage);
        }
    };

    const retryCamera = useCallback(() => {
        setCapturedImage(null);
        startCamera(facing);
    }, [facing, startCamera]);

    // ============================================================================
    // Lifecycle
    // ============================================================================

    useEffect(() => {
        mountedRef.current = true;
        startCamera(initialFacing);

        return () => {
            mountedRef.current = false;
            stopStream();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ============================================================================
    // Corner Bracket Style
    // ============================================================================

    const cornerStyle: React.CSSProperties = {
        position: "absolute",
        width: `${cornerSize}px`,
        height: `${cornerSize}px`,
        borderColor: accentColor,
        borderStyle: "solid",
        pointerEvents: "none",
        zIndex: 10,
    };

    // ============================================================================
    // Render
    // ============================================================================

    return (
        <div className={cn("flex flex-col items-center gap-4", className)} style={{ width }}>
            {/* Camera Frame Container */}
            <div
                className="relative overflow-hidden rounded-lg"
                style={{
                    width: "100%",
                    aspectRatio: height ? undefined : aspectRatio,
                    height: height || "auto",
                    backgroundColor,
                }}
            >
                {/* Hidden Canvas for Capture */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Corner Brackets */}
                <div style={{ ...cornerStyle, top: framePadding, left: framePadding, borderWidth: `${strokeWidth}px 0 0 ${strokeWidth}px` }} />
                <div style={{ ...cornerStyle, top: framePadding, right: framePadding, borderWidth: `${strokeWidth}px ${strokeWidth}px 0 0` }} />
                <div style={{ ...cornerStyle, bottom: framePadding, left: framePadding, borderWidth: `0 0 ${strokeWidth}px ${strokeWidth}px` }} />
                <div style={{ ...cornerStyle, bottom: framePadding, right: framePadding, borderWidth: `0 ${strokeWidth}px ${strokeWidth}px 0` }} />

                {/* Video/Image Preview Area - Clipped within frame */}
                <div
                    className="absolute overflow-hidden cursor-pointer"
                    style={{
                        top: framePadding + cornerSize / 2,
                        left: framePadding + cornerSize / 2,
                        right: framePadding + cornerSize / 2,
                        bottom: framePadding + cornerSize / 2,
                        borderRadius: "4px",
                    }}
                    onClick={capturePhoto}
                >
                    {/* Show captured image or live video */}
                    {capturedImage ? (
                        <img
                            src={capturedImage.base64}
                            alt="Captured"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            onLoadedData={handleVideoLoaded}
                            className="w-full h-full object-cover"
                            style={{
                                transform: facing === "user" && mirrorFrontCamera ? "scaleX(-1)" : undefined,
                            }}
                        />
                    )}
                </div>

                {/* Center Crosshair */}
                {showCrosshair && status === "active" && !capturedImage && (
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
                        style={{ width: `${crosshairSize}px`, height: `${crosshairSize}px` }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                width: `${strokeWidth}px`,
                                height: `${crosshairSize}px`,
                                backgroundColor: accentColor,
                                opacity: 0.7,
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                width: `${crosshairSize}px`,
                                height: `${strokeWidth}px`,
                                backgroundColor: accentColor,
                                opacity: 0.7,
                            }}
                        />
                    </div>
                )}

                {/* Status Overlays */}
                {status === "requesting" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/50">
                        <div
                            className="w-10 h-10 border-4 rounded-full animate-spin mb-4"
                            style={{ borderColor: `${accentColor} transparent transparent transparent` }}
                        />
                        <p className="text-white text-sm font-medium">Requesting camera access...</p>
                    </div>
                )}

                {(status === "error" || status === "denied" || status === "not-supported") && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 px-6">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                            style={{ backgroundColor: "rgba(255,100,100,0.2)" }}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6464" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <p className="text-white text-sm text-center mb-4">{errorMessage}</p>
                        <button
                            onClick={retryCamera}
                            className="px-6 py-2 rounded-full text-sm font-medium transition-all active:scale-95"
                            style={{ backgroundColor: accentColor, color: "#fff" }}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            {/* Buttons Row */}
            <div className="flex items-center gap-3 w-full px-8">
                {/* Upload Picture Button */}
                <button
                    onClick={capturedImage ? handleSubmit : handleUploadClick}
                    className="flex-1 flex items-center justify-center gap-1  px-2 py-2 rounded-full font-large text-base transition-all active:scale-95"
                    style={{
                        backgroundColor: "#ABC339",
                        color: "#1a1a1a",
                    }}
                >
                    <span>{capturedImage ? "submit picture" : "upload picture"}</span>
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#1a1a1a" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                </button>


                {/* Camera Button */}
                <button
                    onClick={capturedImage ? retryCamera : capturePhoto}
                    disabled={status !== "active" && !capturedImage}
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-50"
                    style={{
                        backgroundColor: "#ABC339",
                    }}
                    aria-label={capturedImage ? "Retake Photo" : "Capture Photo"}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                        {capturedImage ? (
                            // Refresh icon for retake
                            <>
                                <path d="M23 4v6h-6" />
                                <path d="M1 20v-6h6" />
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </>
                        ) : (
                            // Camera icon
                            <>
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </>
                        )}
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CameraModule;
