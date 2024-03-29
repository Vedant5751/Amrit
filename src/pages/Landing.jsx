import React from "react";
import { WavyBackground } from "../components/wavy-background";
import { SparklesPreview } from "../components/SparklesPreview";
import { TailwindcssButtons } from "../components/Button";

export default function Landing() {
  return (
    <>
      <div className="absolute">
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
