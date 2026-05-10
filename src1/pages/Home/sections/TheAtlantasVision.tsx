"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/common/Link";
import { cn } from "@/lib/utils";

export default function TheAtlantasVision() {
  return (
    <section data-section-id="240307"
      id="the-cinematic-experience"
      className="relative flex h-screen min-h-[600px] w-full flex-col items-center justify-center overflow-hidden dark bg-background text-foreground"
    >
      <style>{`
        @keyframes heroTextReveal {
          0% {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes heroLineExpand {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        @keyframes heroBadgeFade {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .hero-text-1 {
          opacity: 0;
          animation: heroTextReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.6s;
        }

        .hero-text-2 {
          opacity: 0;
          animation: heroTextReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.0s;
        }

        .hero-subtitle {
          opacity: 0;
          animation: heroBadgeFade 1s ease-out forwards;
          animation-delay: 1.6s;
        }

        .hero-cta {
          opacity: 0;
          animation: heroBadgeFade 1s ease-out forwards;
          animation-delay: 2.0s;
        }

        .hero-scroll {
          opacity: 0;
          animation: heroBadgeFade 1s ease-out forwards;
          animation-delay: 2.8s;
        }

        .hero-line {
          transform: scaleX(0);
          animation: heroLineExpand 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.4s;
        }

        .hero-glow {
          animation: heroGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/luxury_event_preview.png"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-man-in-a-suit-walking-in-a-hallway-5247/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-transparent" />

      {/* Subtle side vignettes */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      {/* Content */}
      <div className="relative z-20 flex w-full max-w-6xl flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div className="hero-subtitle mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-primary rounded-full hero-glow" />
            <span className="text-[11px] font-default font-medium uppercase tracking-[0.3em] text-foreground/70">
              Luxury Event Orchestration
            </span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="flex flex-col items-center gap-1 md:gap-2">
          <span className="hero-text-1 font-default text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold tracking-tighter uppercase leading-[0.9]">
            Defining Orchestrated
          </span>
          <div className="hero-line w-24 md:w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent my-2 md:my-4" />
          <span className="hero-text-2 font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary tracking-normal leading-[1]">
            Excellence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-8 md:mt-10 max-w-xl text-sm md:text-base text-foreground/50 font-default leading-relaxed tracking-wide">
          Where architectural precision meets luxury — creating immersive events that transcend the ordinary.
        </p>

        {/* CTA */}
        <div className="hero-cta mt-10 md:mt-12">
          <Link
            to="/ContactPage"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-14 px-12 text-xs md:text-sm font-default font-semibold tracking-[0.2em] uppercase border border-primary/50 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-700 rounded-none backdrop-blur-sm flex items-center justify-center w-fit mx-auto"
            )}
          >
            Book a Consultation
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
        <Link to="#expertise" aria-label="Scroll down to next section" className="group flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/30 transition-colors duration-500 group-hover:text-primary font-default">
            Discover
          </span>
          <div className="relative w-[1px] h-10 bg-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-primary/60 animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}