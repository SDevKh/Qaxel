"use client";

import React, { useEffect, useRef, useState } from "react";
import { ClipboardCheck, PackageOpen, SearchCheck, Sparkles, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/common/Link";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Concept",
    description: "We translate your vision into a structural blueprint, defining the architectural flow and aesthetic narrative of your exclusive event.",
    icon: ClipboardCheck,
  },
  {
    title: "Curation",
    description: "Our team meticulously selects every element, from bespoke furnishings to world-class talent, ensuring a cohesive luxury experience.",
    icon: PackageOpen,
  },
  {
    title: "Execution",
    description: "The orchestration comes to life with surgical precision. We manage every logistical detail so you can remain fully present in the moment.",
    icon: Sparkles,
  },
  {
    title: "Refinement",
    description: "A final audit of the sensory landscape ensures every touchpoint meets the EVENT ZONE standard of absolute perfection.",
    icon: SearchCheck,
  },
];

export default function ThePerfectProtocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;


      const totalScrollableDistance = rect.height || 1;
      const currentScrollPosition = (windowHeight / 2) - rect.top;

      let percentage = (currentScrollPosition / totalScrollableDistance) * 100;


      percentage = Math.max(0, Math.min(100, percentage));
      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section data-section-id="222853" id="the-orchestration-process" ref={sectionRef} className="dark bg-background text-foreground relative min-h-screen">
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-2xl border-b border-white/[0.06] py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <h2 className="text-sm md:text-base font-default font-semibold tracking-[0.15em] uppercase text-foreground/80">
                The Orchestration Process
              </h2>
            </div>
            <span className="text-xs font-mono text-primary/70 tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-[2px] bg-white/5" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-28 md:py-36">
        <div className="text-center mb-28">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-default font-bold text-foreground mb-6 tracking-tight">
            Architectural Precision, <br className="hidden md:block" /> Unrivaled Luxury.
          </h3>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-default leading-relaxed">
            Our methodology balances structural integrity with vast negative space — creating events that are both heavy in prestige and light in execution.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative ml-4 md:ml-12 space-y-24 md:space-y-32 pb-24">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} data-index={i} className="relative pl-10 md:pl-20 min-h-[25vh] flex flex-col justify-center group">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[4px]">
                  <div className="size-[9px] bg-background border-2 border-primary/50 transition-all duration-700 group-hover:border-primary group-hover:bg-primary group-hover:scale-125" />
                </div>

                {/* Step number watermark */}
                <span className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 text-[7rem] md:text-[12rem] font-serif font-bold text-primary/[0.04] select-none leading-none pointer-events-none transition-all duration-700 group-hover:text-primary/[0.08]">
                  0{i + 1}
                </span>

                <Card className="relative z-10 border-none shadow-none bg-white/[0.02] backdrop-blur-sm rounded-none overflow-visible">
                  <CardHeader className="px-6 pt-6 pb-3">
                    <div className="flex items-center gap-4 mb-1">
                      <div className="p-2.5 bg-primary/[0.06] border border-primary/10 text-primary">
                        <Icon className="size-5 stroke-[1.5px]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-default uppercase tracking-[0.25em] text-muted-foreground block mb-1">Step {i + 1}</span>
                        <CardTitle className="text-2xl md:text-3xl font-default font-bold text-foreground tracking-tight">
                          {step.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl font-default font-light">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center relative z-20">
          <Link
            to="/ContactPage"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-none px-12 h-14 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-700 uppercase tracking-[0.18em] font-default font-semibold text-xs backdrop-blur-sm flex items-center justify-center mx-auto w-fit"
            )}
          >
            Begin Your Orchestration
            <ArrowRight className="ml-3 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}