"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import TypingText from "./TypingText";

export function SparklesPreview() {
  return (
    <div className="h-[50rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="mb-40 md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        <TypingText />
      </h1>
    </div>
  );
}
