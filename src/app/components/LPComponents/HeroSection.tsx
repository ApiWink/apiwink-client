"use client";

import RetroGrid from "@/components/ui/retro-grid";
import ShimmerButton from "@/components/ui/shimmer-button";
import TextReveal from "@/components/ui/text-reveal";
import { BentoDemo } from "./Bento";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const router = useRouter();
  return (
    <div className="relative flex w-full min-h-screen flex items-center justify-center bg-background px-[5%]">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#333333] via-[#000000] to-[#111111] bg-clip-text text-center font-bold leading-none tracking-tighter text-transparent flex flex-col justify-center items-center">
        <span className="text-5xl mt-5">APIs that grow with you</span>
        <div className="flex justify-center items-center w-full">
          <Button onClick={() => router.push("/signup")}>Get Started</Button>
        </div>
      </span>

      <RetroGrid />
    </div>
  );
}
