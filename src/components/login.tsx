"use client";

import { useLogin } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import { Outfit } from "next/font/google";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Outfit font configuration
const outfit = Outfit({ subsets: ["latin"] });

const Login = () => {
    const { mutate: login, isPending, error } = useLogin();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        login(
            { username, password },
            {
                onSuccess: () => {
                    router.push('/dashboard');
                },
                onError: (err: Error) => {
                    console.error("Login failed", err);
                }
            }
        );
    };

    return (
        // Main container with light background specific to design (#efffd0 approx from image)
        <div className={`flex min-h-screen flex-col bg-[#efffd0] ${outfit.className} overflow-hidden font-sans`}>

            {/* Top Section (Light) */}
            <div className="z-50 flex-1 flex flex-row items-center justify-center px-2 relative">
                <div className="flex items-center justify-between w-full max-w-md">
                    <div className="relative h-72 w-72 -ml-4">
                        <Image
                            src="/planet.svg"
                            alt="Planet Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex flex-col items-start z-10 -ml-8">
                        <h1 className="text-[2.1rem] leading-none font-black tracking-tighter lg:text-5xl text-black">
                            WELCOME BACK.
                        </h1>

                    </div>
                </div>
            </div>

            {/* Bottom Section (Dark) */}
            <div className="bg-[#22201F] rounded-t-[40px] px-8 pt-10 pb-12 w-full flex flex-col items-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)] -mt-10 z-20">
                <div className="w-full max-w-md space-y-8">
                    <h2 className="text-white text-4xl font-medium font-area-extended-bold tracking-wide text-left mb-6">
                        Login
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute font-area-extended-bold left-4 top-3.5 h-5 w-5 text-gray-400 z-10" />
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                    className="pl-12 h-12 rounded-full bg-white border-none text-black placeholder:text-gray-400 focus-visible:ring-0 not-placeholder-shown:bg-[#efffd0]"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute font-area-extended-bold left-4 top-3.5 h-5 w-5 text-gray-400 z-10" />
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    className="pl-12 h-12 rounded-full bg-white border-none text-black placeholder:text-gray-400 focus-visible:ring-0 not-placeholder-shown:bg-[#efffd0]"
                                    required
                                />
                                <div className="flex justify-end">
                                    <span className="text-sm text-[#cdef45] font-area-extended-bold cursor-pointer hover:underline">
                                        Not registered? Sign Up
                                    </span>
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm font-medium">
                                    {(error as any).response?.data?.detail || "Login failed. Please try again."}
                                </div>
                            )}

                        </div>

                        {/* Sign Up Button - Lime Green */}
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-12 rounded-full text-lg font-semibold font-area-extended-bold bg-[#cdef45] hover:bg-[#b5d63a] text-black border-none cursor-pointer mt-4"
                            disabled={isPending}
                        >
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    {/* Footer Text */}
                    <p className="text-center text-md font-area-extended-bold text-[#cdef45] font-light leading-relaxed">
                        You only live once, make it<br />worth living for.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
