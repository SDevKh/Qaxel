"use client";

import React, { useState } from "react";
import { Link } from "@/components/common/Link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Maximize2 } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "The Grand Gala",
    category: "Private Galas",
    description: "A masterclass in luxury orchestration. We transformed a historic estate into a contemporary dreamscape, blending champagne gold accents with deep charcoal textures to create an atmosphere of unparalleled exclusivity.",
    imageSrc: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/luxury_gala_event.png",
    imageSrcset: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/luxury_gala_event.png-wvc-srcset",
    imageSizes: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/luxury_gala_event.png-wvc-sizes",
    imageAlt: "Luxury gala event highlight",
  },
  {
    id: 2,
    title: "Summit of Excellence",
    category: "Corporate Events",
    description: "Redefining the corporate experience. This high-impact summit utilized architectural minimalism to foster innovation, featuring sharp geometric layouts and seamless digital integration for global industry leaders.",
    imageSrc: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/corporate_summit_design.png",
    imageSrcset: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/corporate_summit_design.png-wvc-srcset",
    imageSizes: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/corporate_summit_design.png-wvc-sizes",
    imageAlt: "Corporate summit event highlight",
  },
  {
    id: 3,
    title: "Ethereal Nuptials",
    category: "Luxury Weddings",
    description: "A celebration of love through the lens of high-end design. We curated a sensory journey using crisp white florals and platinum lighting, ensuring every moment felt like a cinematic masterpiece.",
    imageSrc: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/ethereal_wedding_setup.png",
    imageSrcset: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/ethereal_wedding_setup.png-wvc-srcset",
    imageSizes: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/ethereal_wedding_setup.png-wvc-sizes",
    imageAlt: "Luxury wedding event highlight",
  },
  {
    id: 4,
    title: "The Platinum Soirée",
    category: "Private Galas",
    description: "An intimate gathering defined by sophisticated restraint. By prioritizing negative space and premium materials, we delivered a night of quiet luxury that resonated with the most discerning guests.",
    imageSrc: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/platinum_soiree_details.png",
    imageSrcset: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/platinum_soiree_details.png-wvc-srcset",
    imageSizes: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/platinum_soiree_details.png-wvc-sizes",
    imageAlt: "Private gala event highlight",
  },
];

type Project = typeof projects[0];

export default function CuratedMasterpieces() {
  const [hoveredImg, setHoveredImg] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section data-section-id="242994"
      id="project-highlights"
      className="relative bg-background text-foreground min-h-screen py-24 overflow-hidden"
    >
      { }
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
        {projects.map((p, i) => (
          <img
            key={`bg-${p.id}`}
            data-index={i}
            src={p.imageSrc}
            data-wvc-srcset={p.imageSrcset}
            data-wvc-sizes={p.imageSizes}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover blur-[120px] scale-125 transition-opacity duration-1000 ease-in-out ${hoveredImg === p.imageSrc ? "opacity-20" : "opacity-0"
              }`}
          />
        ))}
        { }
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        { }
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-default font-bold mb-6 tracking-tighter uppercase">
            Project Highlights
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-default">
            A curated selection of high-impact event orchestrations by EVENT ZONE.
            Explore the architectural precision and luxury narratives behind our most exclusive productions.
          </p>
        </div>

        { }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-index={index}
              onMouseEnter={() => setHoveredImg(project.imageSrc)}
              onMouseLeave={() => setHoveredImg(null)}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <Card className="h-[500px] lg:h-[650px] overflow-hidden border-none bg-transparent rounded-none relative shadow-none">
                { }
                <div className="absolute inset-0 overflow-hidden bg-muted">
                  <img
                    src={project.imageSrc}
                    data-wvc-srcset={project.imageSrcset}
                    data-wvc-sizes={project.imageSizes}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  { }
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                { }
                <div className="absolute top-6 right-6 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                  <div className="bg-primary/10 backdrop-blur-md p-3 rounded-none text-primary border border-primary/20">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                { }
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                  <p className="text-primary text-xs md:text-sm font-mono mb-3 tracking-widest uppercase">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-default font-bold text-foreground leading-tight">
                    {project.title}
                  </h3>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      { }
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-sm p-4 md:p-8 animate-in fade-in zoom-in-95 duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 rounded-none bg-secondary/20 hover:bg-primary hover:text-primary-foreground text-foreground"
            onClick={() => setSelectedProject(null)}
          >
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="w-full max-w-7xl h-full max-h-[90vh] flex flex-col lg:flex-row gap-0 overflow-hidden rounded-none bg-card border border-border shadow-4xl">
            { }
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-full relative bg-muted">
              <img
                src={selectedProject.imageSrc}
                data-wvc-srcset={selectedProject.imageSrcset}
                data-wvc-sizes={selectedProject.imageSizes}
                alt={selectedProject.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            { }
            <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
              <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
                {selectedProject.category}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-default font-bold mb-8 text-card-foreground tracking-tighter uppercase">
                {selectedProject.title}
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed font-default">
                {selectedProject.description}
              </p>

              <div className="mt-auto pt-8 border-t border-border">
                <Button asChild size="lg" className="rounded-none w-full sm:w-auto group bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/PortfolioPage">
                    View Case Study
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}