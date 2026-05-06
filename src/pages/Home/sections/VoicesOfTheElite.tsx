"use client";

import * as React from "react";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    author: "Julianne Vought",
    quote: "EVENT ZONE transformed our gala into a cinematic masterpiece. Their attention to detail is simply unparalleled in the luxury space.",
    position: "Director of Global Events",
  },
  {
    author: "Marcus Sterling",
    quote: "The epitome of professional orchestration. They don't just manage events; they curate unforgettable legacies.",
    position: "Private Client",
  },
];

export default function VoicesOfTheElite() {
  return (
    <section data-section-id="245651"
      id="voices-of-excellence"
      className="bg-background text-foreground relative py-28 md:py-36 overflow-hidden flex items-center min-h-[70vh]"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url(https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/minimalist_linen_texture.png)] bg-cover bg-center opacity-[0.03] mix-blend-multiply pointer-events-none"></div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>

      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 text-primary/[0.03] font-serif text-[20rem] leading-none select-none pointer-events-none hidden lg:block">"</div>
      <div className="absolute bottom-20 right-10 text-primary/[0.03] font-serif text-[20rem] leading-none select-none pointer-events-none hidden lg:block rotate-180">"</div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-8 h-px bg-primary/30" />
            <span className="text-[11px] font-default font-medium uppercase tracking-[0.25em] text-muted-foreground">Testimonials</span>
            <span className="w-8 h-px bg-primary/30" />
          </div>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, i) => (
              <CarouselItem key={i} data-index={i}>
                <div className="flex flex-col items-center justify-center px-6 md:px-16 py-8">
                  {/* Decorative line */}
                  <div className="w-12 h-px bg-primary/30 mb-10" />

                  {/* Quote */}
                  <p className="text-xl md:text-3xl lg:text-4xl font-serif italic text-center leading-relaxed md:leading-[1.5] mb-12 text-foreground/85">
                    "{testimonial.quote}"
                  </p>

                  {/* Author info */}
                  <div className="text-center flex flex-col items-center gap-2">
                    <div className="w-8 h-px bg-primary/25 mb-3"></div>
                    <h4 className="text-base md:text-lg font-default font-semibold text-foreground tracking-wide">
                      {testimonial.author}
                    </h4>
                    <p className="text-[11px] text-muted-foreground/70 uppercase tracking-[0.3em] font-default">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <div className="hidden md:block">
            <CarouselPrevious className="border-white/10 text-foreground/40 hover:text-foreground hover:bg-white/5 hover:border-white/20 size-12 -left-4 lg:-left-16 transition-all duration-500 bg-transparent rounded-none" />
            <CarouselNext className="border-white/10 text-foreground/40 hover:text-foreground hover:bg-white/5 hover:border-white/20 size-12 -right-4 lg:-right-16 transition-all duration-500 bg-transparent rounded-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}