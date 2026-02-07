import React from "react";
import CameraModule from "@/components/cameramodule";
import UpNav from "@/components/up-nav";
import Navbar from "@/components/navbar";

export default function Camera() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-between">
            <UpNav title="Camera" />
            <CameraModule />
            <div className="bg-[#22201F] rounded-t-[40px] px-8 pt-6 pb-12 w-full flex flex-col items-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)] mt-10 overflow-hidden">
                <p
                    className="text-[#ABC339] text-center text-lg my-4 italic"
                >
                    What happens when you capture/upload a pic?
                </p>
                <p className="text-white text-sm text-center leading-relaxed">
                    We run your picture through a trained ml model to categorise the waste based on its recyclability, we then provide you with resell value and where to resell to make the best use of the generated waste. We also help you keep track of CO2 emissions, fuel saved and waste generated with mini fun facts.
                </p>
            </div>
            <Navbar />
        </div>
    );
}