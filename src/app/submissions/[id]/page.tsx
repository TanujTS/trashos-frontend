"use client";

import { useSubmission } from "@/hooks/use-submissions";
import { useParams, useRouter } from "next/navigation";
import UpNav from "@/components/up-nav";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { format } from "date-fns";
import { Loader2, Trash2 } from "lucide-react";
import { submissionsService } from "@/services/submissions";
import { useDeleteSubmission } from "@/hooks/use-submissions";
import { Button } from "@/components/ui/button";

export default function SubmissionDetails() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const { data: submission, isLoading, error } = useSubmission(id);
    const { mutate: deleteSubmission, isPending: isDeleting } = useDeleteSubmission();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this submission?")) {
            deleteSubmission(id, {
                onSuccess: () => {
                    router.push('/dashboard');
                }
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !submission) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground gap-4">
                <p>Failed to load submission details.</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    const imageUrl = submission.image_path_url.split('/').pop();
    const fullImageUrl = imageUrl ? submissionsService.getFileUrl(imageUrl) : '';

    return (
        <div className="min-h-screen bg-background px-4 pt-6 pb-28 font-sans">
            <UpNav title="Details" />

            <div className="mt-6 flex flex-col gap-6">
                {/* Image */}
                <div className="relative w-full aspect-square rounded-[30px] overflow-hidden bg-card border border-border">
                    {fullImageUrl ? (
                        <Image
                            src={fullImageUrl}
                            alt={submission.classification || "Submission Image"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                    )}
                    <div className="absolute top-4 right-4 bg-background/80 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm">
                        {submission.status}
                    </div>
                </div>

                {/* Classification Info */}
                <div className="bg-card rounded-[30px] p-6 border border-border space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground capitalize">
                                {submission.classification?.replace(/_/g, ' ') || "Unclassified"}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                {format(new Date(submission.created_at), "PPP p")}
                            </p>
                        </div>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-full w-10 h-10"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-background/50 p-3 rounded-2xl">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Material</p>
                            <p className="font-medium text-foreground">{submission.material_type || "-"}</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded-2xl">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Recyclable</p>
                            <p className={`font-medium ${submission.recyclable ? 'text-green-500' : 'text-red-500'}`}>
                                {submission.recyclable ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="bg-background/50 p-3 rounded-2xl">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Value</p>
                            <p className="font-medium text-foreground">{submission.resell_value ? `₹${submission.resell_value}` : "-"}</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded-2xl">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">CO2 Saved</p>
                            <p className="font-medium text-foreground">{submission.co2_saved ? `${submission.co2_saved}g` : "-"}</p>
                        </div>
                    </div>
                </div>

                {/* Resell Places */}
                {submission.resell_places && submission.resell_places.length > 0 && (
                    <div className="bg-primary/10 rounded-[30px] p-6 border border-primary/20">
                        <h3 className="font-bold text-lg mb-3 text-primary">Where to sell/recycle</h3>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                            {submission.resell_places.map((place, index) => (
                                <li key={index}>{place}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <Navbar />
        </div>
    );
}
