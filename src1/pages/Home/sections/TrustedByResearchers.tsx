"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const partners = [
  {
    id: 1,
    name: "The Ritz-Carlton",
    logo: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/partner_ritz_carlton.png",
    certification: "Preferred Venue Partner",
  },
  {
    id: 2,
    name: "Vogue Magazine",
    logo: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/partner_vogue_editorial.png",
    certification: "Featured Event Stylist",
  },
  {
    id: 3,
    name: "Moët & Chandon",
    logo: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/partner_moet_chandon.png",
    certification: "Official Champagne Partner",
  },
  {
    id: 4,
    name: "Aman Resorts",
    logo: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/partner_aman_resorts.png",
    certification: "Exclusive Global Access",
  },
  {
    id: 5,
    name: "Sotheby's International",
    logo: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/partner_sothebys_realestate.png",
    certification: "Private Gala Collaborator",
  },
];

export default function TrustedByResearchers() {
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.1 });

  return (
    <section data-section-id="222791"
      id="exclusive-venues"
      className="bg-background text-foreground py-20 md:py-28 px-4 overflow-hidden relative"
    >
      {/* Subtle top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

      <div
        ref={ref}
        className={`container mx-auto max-w-6xl transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="w-6 h-px bg-primary/30" />
            <span className="text-[10px] font-default font-medium uppercase tracking-[0.25em] text-muted-foreground/60">Trusted By</span>
            <span className="w-6 h-px bg-primary/30" />
          </div>
          <h2 className="text-sm md:text-base uppercase tracking-[0.2em] font-semibold font-default text-muted-foreground">
            Our Prestigious Network
          </h2>
        </div>

        <TooltipProvider>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-24">
            {partners.map((partner, i) => (
              <div
                key={partner.id}
                data-index={i}
                className="flex items-center justify-center transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Tooltip delayDuration={200}>
                  <TooltipTrigger className="relative group cursor-help flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-ring p-3">
                    <img
                      src={partner.logo}
                      alt={`Logo of ${partner.name}`}
                      className="h-9 md:h-11 w-auto object-contain grayscale opacity-35 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-90 group-focus-visible:grayscale-0 group-focus-visible:opacity-90"
                      loading="lazy"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={16}
                    className="bg-card/95 text-card-foreground border border-border/50 shadow-xl rounded-none px-5 py-3 max-w-[220px] text-center backdrop-blur-xl"
                  >
                    <p className="font-semibold text-[10px] uppercase tracking-[0.15em] font-default text-foreground/80">
                      {partner.certification}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 font-default mt-1 font-light">
                      {partner.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}