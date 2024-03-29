import React from "react";
import { WavyBackground } from "../components/wavy-background";
import { SparklesPreview } from "../components/SparklesPreview";

export default function Landing() {
  return (
    <>
      <div className="absolute">
        <WavyBackground />
      </div>
      <div className="relative opacity-50">
        <SparklesPreview />
      </div>
    </>
  );
}
