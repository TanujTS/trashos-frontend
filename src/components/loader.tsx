"use client";

export default function Loader() {
    return (
        <div className="h-screen w-full bg-primary flex flex-col items-center justify-between relative overflow-hidden font-sans p-4">

            {/* Decorative Stars with Animations */}
            <img src="/star.png" alt="" className="absolute top-48 left-4 w-8 h-8 animate-pulse rotate-z-32" />
            <img src="/star.png" alt="" className="absolute top-48 right-4 w-8 h-8 animate-bounce" style={{ animationDuration: '2s' }} />
            <img src="/star.png" alt="" className="absolute top-78 right-32 w-4 h-4 animate-pulse rotate-z-32" style={{ animationDuration: '2s' }} />
            <img src="/star.png" alt="" className="absolute top-84 left-28 w-4 h-4 animate-counce -rotate-z-32" />
            
            
            {/* Text Content */}
            <div className="z-10 text-center mt-8">
                <h1 className="text-secondary text-5xl font-bold mb-2 leading-tight">Welcome to</h1>
                <h1 className="text-foreground text-6xl font-black tracking-tight mb-12">TrashOS</h1>
                <p className="text-card text-xl md:text-2xl font-bold px-6 max-w-md leading-relaxed mb-8">
                    Let's plan your waste before your planet gets wasted
                </p>
            </div>

                {/* Phone Frame Image */}
                <img
                    src="/phonee.png"
                    alt="TrashOS App Preview"
                    className="relative w-3/4 h-auto object-cover drop-shadow-2xl z-10 mt-12"
                />
            </div>
        
    );
}
