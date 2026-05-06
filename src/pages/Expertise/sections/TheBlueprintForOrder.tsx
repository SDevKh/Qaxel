"use client";

import React from "react";
import { Link } from "@/components/common/Link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ruler } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function TheBlueprintForOrder() {
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.1 });

  return (
    <section data-section-id="235414"
      id="the-art-of-planning"
      className="bg-background text-foreground relative flex min-h-[85vh] items-center justify-center overflow-hidden py-24 lg:py-32"
    >
      { }
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url(https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/luxury_event_texture.png)] bg-repeat bg-[length:60px_60px]" />
      </div>

      { }
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      <div
        ref={ref}
        className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mx-auto mb-6 flex max-w-fit items-center justify-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
          <Ruler className="size-4 text-primary" />
          <span className="font-mono text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            The Philosophy of Orchestration
          </span>
        </div>

        <h1 className="font-default mx-auto mb-8 max-w-5xl text-5xl font-bold uppercase leading-[1.1] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          The Art Of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
            Seamless Planning.
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl font-default">
          EVENT ZONE defines the new standard in luxury event management. We curate high-impact experiences through architectural precision and deliberate, high-end design.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button
            asChild
            size="lg"
            className="h-14 w-full px-8 text-base font-bold uppercase tracking-widest sm:w-auto bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-none"
          >
            <Link to="/ContactPage">
              Book Consultation
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 w-full border-foreground/20 px-8 text-base font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background sm:w-auto rounded-none"
          >
            <Link to="/PortfolioPage">
              The Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}