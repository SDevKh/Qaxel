"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, X, Zap, Rocket, Crown, ShieldCheck, Headset, Ban, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/common/Link";

type UseRevealOnScrollOptions = {
  once?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
};

function useRevealOnScroll<T extends HTMLElement = HTMLElement>({
  once = true,
  threshold = 0.1,
  rootMargin = "0px",
}: UseRevealOnScrollOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  return { ref, isVisible };
}

const plans = [
  {
    id: "starter",
    name: "Essential Curation",
    apy: "Bespoke",
    range: "Private Galas & Soirées",
    icon: Zap,
    isPopular: false,
    buttonText: "Request Bespoke Quote",
    buttonVariant: "outline",
  },
  {
    id: "growth",
    name: "Premier Orchestration",
    apy: "Elite",
    range: "Corporate & Luxury Weddings",
    icon: Rocket,
    isPopular: true,
    buttonText: "Request Bespoke Quote",
    buttonVariant: "default",
  },
  {
    id: "pro",
    name: "Grand Legacy",
    apy: "Iconic",
    range: "Global Summits & Estates",
    icon: Crown,
    isPopular: false,
    buttonText: "Request Bespoke Quote",
    buttonVariant: "outline",
  },
];

const features = [
  { planId: "starter", text: "Dedicated event designer", included: true },
  { planId: "starter", text: "Vendor selection & management", included: true },
  { planId: "starter", text: "On-site coordination (8 hours)", included: true },
  { planId: "starter", text: "International logistics", included: false },
  { planId: "starter", text: "Custom set construction", included: false },

  { planId: "growth", text: "Full-service creative direction", included: true },
  { planId: "growth", text: "Exclusive venue access", included: true },
  { planId: "growth", text: "24/7 concierge support", included: true },
  { planId: "growth", text: "Guest list & RSVP management", included: true },
  { planId: "growth", text: "Bespoke catering curation", included: true },
  { planId: "growth", text: "Multi-day event logistics", included: true },

  { planId: "pro", text: "Global destination management", included: true },
  { planId: "pro", text: "Private jet & travel logistics", included: true },
  { planId: "pro", text: "Dedicated executive producer", included: true },
  { planId: "pro", text: "Custom architectural builds", included: true },
  { planId: "pro", text: "Celebrity talent procurement", included: true },
  { planId: "pro", text: "VIP security & privacy detail", included: true },
  { planId: "pro", text: "Post-event legacy media", included: true },
];

const bottomFeatures = [
  { icon: ShieldCheck, title: "Absolute Discretion", desc: "NDA-backed privacy" },
  { icon: Zap, title: "Seamless Execution", desc: "Zero-friction delivery" },
  { icon: Headset, title: "Elite Concierge", desc: "Direct partner access" },
  { icon: Ban, title: "Transparent Ledger", desc: "Clear financial reporting" },
];

export default function PricingPlans() {
  const headerReveal = useRevealOnScroll<HTMLDivElement>();
  const gridReveal = useRevealOnScroll<HTMLDivElement>({ threshold: 0.05 });
  const footerReveal = useRevealOnScroll<HTMLDivElement>();

  return (
    <section data-section-id="249232" id="signature-tiers-of-excellence" className="dark bg-background py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        { }
        <div
          ref={headerReveal.ref}
          className={`max-w-3xl mx-auto text-center space-y-4 transition-all duration-700 ease-out ${headerReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30 px-3 py-1 rounded-none font-default tracking-widest uppercase text-[10px]">
            Service Tiers
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-default font-bold tracking-tight text-foreground">
            Signature <span className="text-primary italic font-serif font-normal">Tiers of Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-default font-light leading-relaxed">
            Discover our curated levels of orchestration, each designed to deliver a seamless and professional event experience.
          </p>
        </div>

        { }
        <div
          ref={gridReveal.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 transition-all duration-1000 delay-200 ease-out ${gridReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const planFeatures = features.filter((f) => f.planId === plan.id);

            return (
              <Card
                key={plan.id}
                data-index={i}
                className={`relative flex flex-col h-full transition-all duration-500 rounded-none bg-white/5 backdrop-blur-sm ${plan.isPopular
                  ? "border-primary/50 shadow-2xl shadow-primary/5 md:-mt-4 md:mb-4 z-10 ring-1 ring-primary/20"
                  : "border-border/20 shadow-none hover:border-primary/30"
                  }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 rounded-none text-[10px] tracking-widest uppercase">
                      The Standard
                    </Badge>
                  </div>
                )}

                <CardHeader className="pt-8 pb-6 text-center border-b border-border/10">
                  <div className="mx-auto bg-primary/5 p-3 rounded-none w-fit mb-4">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-default font-semibold tracking-wide uppercase mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-serif font-medium text-foreground">
                      {plan.apy}
                    </span>
                  </div>
                  <CardDescription className="text-xs font-default tracking-widest uppercase text-muted-foreground">
                    {plan.range}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pt-6 pb-8">
                  <ul className="space-y-4">
                    {planFeatures.map((feature, j) => (
                      <li key={j} data-index={j} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {feature.included ? (
                            <Check className="size-4 text-primary" />
                          ) : (
                            <X className="size-4 text-muted-foreground/20" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-default font-light tracking-wide ${feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/40 line-through decoration-muted-foreground/20"
                            }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-0 pb-8 px-6">
                  <Button
                    className="w-full group rounded-none border-primary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    variant={plan.buttonVariant as "default" | "outline"}
                    size="lg"
                    asChild
                  >
                    <Link to="/ContactPage">
                      <span className="font-default tracking-widest uppercase text-xs">{plan.buttonText}</span>
                      <ArrowRight className="ml-2 size-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        { }
        <div
          ref={footerReveal.ref}
          className={`flex flex-wrap justify-center gap-4 md:gap-6 mt-16 max-w-5xl mx-auto transition-all duration-700 delay-400 ease-out ${footerReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {bottomFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                data-index={i}
                className="flex items-center gap-3 bg-white/5 border border-border/10 rounded-none px-5 py-3 shadow-none hover:bg-white/10 transition-colors"
              >
                <div className="bg-primary/5 p-2 rounded-none shrink-0">
                  <Icon className="size-5 text-primary stroke-[1px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-default font-bold tracking-widest uppercase text-foreground leading-tight">
                    {feat.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5 font-default font-light">
                    {feat.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}