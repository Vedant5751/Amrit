import React from "react";
import { WavyBackground } from "../components/wavy-background";
import { SparklesPreview } from "../components/SparklesPreview";
import { TailwindcssButtons } from "../components/Button";
import { FloatingNav } from "../components/LandingNav";

export default function Landing() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <FloatingNav />
      </div>
      <div className="absolute" id="Wavy">
        <WavyBackground />
      </div>
      <div className="relative opacity-50">
        <SparklesPreview />
      </div>
      <div className="absolute top-20 left-0 w-full h-full flex justify-center items-center">
        <TailwindcssButtons />
      </div>
    </>
  );
}
