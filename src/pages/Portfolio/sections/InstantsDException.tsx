"use client";

import React, { useState } from "react";
import { ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";


type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
};


const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_luxury_gala_ballroom.png",
    alt: "Grand gala ballroom with champagne gold lighting",
    caption: "An evening of architectural elegance and curated atmosphere.",
  },
  {
    id: 2,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_corporate_summit_minimal.png",
    alt: "Minimalist corporate summit stage design",
    caption: "Precision-engineered environments for global industry leaders.",
  },
  {
    id: 3,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_wedding_reception_outdoor.png",
    alt: "Luxury outdoor wedding reception at dusk",
    caption: "Timeless celebrations where heritage meets modern sophistication.",
  },
  {
    id: 4,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_private_dinner_details.png",
    alt: "Close up of bespoke table setting with gold accents",
    caption: "The art of the detail: bespoke elements for private galas.",
  },
  {
    id: 5,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_modern_event_architecture.png",
    alt: "Ultra-modern event structure with glass walls",
    caption: "Structural integrity meets high-contrast luxury design.",
  },
  {
    id: 6,
    src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_cinematic_event_lighting.png",
    alt: "Cinematic lighting setup for a high-end event",
    caption: "Weighty elegance captured through cinematic light and shadow.",
  },
];

export default function InstantsDException() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const { ref: headerRef, isVisible: isHeaderVisible } = useRevealOnScroll({ threshold: 0.1 });
  const { ref: galleryRef, isVisible: isGalleryVisible } = useRevealOnScroll({ threshold: 0.05 });

  return (
    <section data-section-id="222229"
      id="the-gallery"
      className="dark bg-background py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        { }
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-1000 ease-out ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-default font-bold tracking-tighter text-foreground mb-6">
            The Portfolio
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed tracking-wide">
            A curated collection of architectural event design. Experience the
            seamless orchestration of luxury, from corporate summits to
            exclusive private galas.
          </p>
        </div>

        { }
        <div
          ref={galleryRef}
          className={`columns-1 md:columns-2 lg:columns-3 gap-12 transition-all duration-1000 delay-200 ease-out ${isGalleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              data-index={i}
              className="break-inside-avoid mb-12 group relative cursor-pointer overflow-hidden rounded-none border border-white/5 bg-white/5 backdrop-blur-sm"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 grayscale hover:grayscale-0"
                loading="lazy"
              />

              { }
              <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-primary text-primary-foreground p-4 rounded-none transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                  <ZoomIn className="w-6 h-6" strokeWidth={1} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      { }
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent
          className="max-w-[95vw] md:max-w-[85vw] h-[95vh] p-0 border-none bg-background/95 backdrop-blur-md shadow-none flex flex-col justify-center items-center"
          showCloseButton={true}
        >
          { }
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Portfolio Detail View"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedImage?.caption || "Detailed view of our event orchestration portfolio"}
          </DialogDescription>

          {selectedImage && (
            <div className="relative w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain shadow-4xl rounded-none border border-white/10"
              />
              <div className="mt-8 text-center max-w-2xl px-4">
                <p className="text-foreground font-serif text-xl md:text-3xl tracking-wider font-light">
                  {selectedImage.caption}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}