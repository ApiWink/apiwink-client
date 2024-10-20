"use client";

import RetroGrid from "@/components/ui/retro-grid";
import ShimmerButton from "@/components/ui/shimmer-button";
import TextReveal from "@/components/ui/text-reveal";
import { BentoDemo } from "./Bento";

export function HeroSection() {
  return (
    <div className="relative flex w-full min-h-screen flex items-center justify-center bg-background px-[5%]">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#333333] via-[#000000] to-[#111111] bg-clip-text text-center font-bold leading-none tracking-tighter text-transparent flex flex-col justify-center items-center">
        <span className="text-5xl mt-5">APIs that grow with you</span>
        <div className="flex justify-center items-center w-full">
          <ShimmerButton className="shadow-2xl mt-5 flex justify-center items-center w-fit">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Get Started
            </span>
          </ShimmerButton>
        </div>
      </span>
      {/* <div className="w-[40vw] h-[30vh]">
        <BentoDemo />
      </div> */}
      <RetroGrid />
    </div>
  );
}
