"use client";

import React, { useState } from "react";
import { Expand } from "lucide-react";
import { Link } from "@/components/common/Link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const galleryImages = [
  {
    id: 1,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_gala_luxury_1.png",
    alt: "High-end corporate gala with architectural lighting",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_wedding_minimalist.png",
    alt: "Minimalist luxury wedding ceremony setup",
    aspect: "aspect-square",
  },
  {
    id: 3,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_private_dinner_gold.png",
    alt: "Private dinner featuring champagne gold accents",
    aspect: "aspect-video",
  },
  {
    id: 4,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_stage_design_modern.png",
    alt: "Ultra-modern stage design for industry leaders",
    aspect: "aspect-[4/5]",
  },
  {
    id: 5,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_outdoor_soiree.png",
    alt: "Exclusive outdoor evening soiree with platinum decor",
    aspect: "aspect-[3/2]",
  },
  {
    id: 6,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_floral_installation.png",
    alt: "Architectural floral installation for a luxury event",
    aspect: "aspect-square",
  },
  {
    id: 7,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_cocktail_lounge.png",
    alt: "Sophisticated cocktail lounge with deep charcoal textures",
    aspect: "aspect-[3/4]",
  },
  {
    id: 8,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_runway_event.png",
    alt: "High-fashion runway event orchestration",
    aspect: "aspect-video",
  },
  {
    id: 9,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_table_setting_detail.png",
    alt: "Crisp white and gold table setting detail",
    aspect: "aspect-[4/3]",
  },
  {
    id: 10,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_lighting_ambiance.png",
    alt: "Cinematic lighting ambiance for a private gala",
    aspect: "aspect-[2/3]",
  },
];

function GalleryItem({
  image,
  index,
  onClick,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onClick: (src: string, alt: string) => void;
}) {
  const { ref, isVisible } = useRevealOnScroll({
    threshold: 0.1,
    rootMargin: "50px",
  });

  return (
    <div
      ref={ref}
      data-index={index}
      className={`break-inside-avoid mb-6 relative group cursor-pointer overflow-hidden transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{ transitionDelay: `${(index % 5) * 100}ms` }}
      onClick={() => onClick(image.src, image.alt)}
    >
      <div className={`relative w-full ${image.aspect}`}>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Film grain overlay for luxury feel */}
        <div className="absolute inset-0 bg-background/5 mix-blend-multiply pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-[1px]">
          <div className="text-white text-center p-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            <div className="w-10 h-10 border border-white/40 flex items-center justify-center mx-auto mb-3">
              <Expand className="w-4 h-4 opacity-80" />
            </div>
            <p className="font-default text-[10px] tracking-[0.25em] uppercase text-white/70">View</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CapturingTheMoment() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const { ref: headerRef, isVisible: headerVisible } = useRevealOnScroll({ threshold: 0.1 });

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setLightboxOpen(true);
  };

  return (
    <section data-section-id="222072"
      id="curated-masterpieces"
      className="py-28 md:py-36 px-4 md:px-8 bg-background text-foreground relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-20 max-w-2xl mx-auto transition-all duration-1000 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="w-8 h-px bg-primary/40" />
            <span className="text-[11px] font-default font-medium uppercase tracking-[0.25em] text-muted-foreground">Our Work</span>
            <span className="w-8 h-px bg-primary/40" />
          </div>

          <h2 className="font-default text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight font-bold">
            Curated Masterpieces
          </h2>
          <p className="text-muted-foreground font-default text-base md:text-lg leading-relaxed tracking-wide max-w-lg mx-auto">
            A visual anthology of our most prestigious orchestrations — from private galas to global summits.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6">
          {galleryImages.map((image, i) => (
            <GalleryItem
              key={image.id}
              index={i}
              image={image}
              onClick={handleImageClick}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 flex justify-center">
          <Link to="/PortfolioPage">
            <Button
              variant="outline"
              className="h-12 px-10 rounded-none border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-700 bg-transparent font-default text-[11px] uppercase tracking-[0.2em]"
            >
              View Full Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-[95vw] md:max-w-screen-xl bg-background/95 backdrop-blur-xl border-none shadow-none p-0 flex items-center justify-center"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">Portfolio Gallery Lightbox</DialogTitle>
          <DialogDescription className="sr-only">
            {selectedImage?.alt || "Enlarged portfolio masterpiece"}
          </DialogDescription>

          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-foreground/40 font-default text-[10px] uppercase tracking-[0.2em] pb-4 md:pb-8">
                {selectedImage.alt}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}