import React from "react";
import { MapPin, Navigation, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/common/Link";

export default function StepsFromTheSacred() {
  return (
    <section data-section-id="224794"
      id="our-studio"
      className="bg-background text-foreground w-full overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[800px]">

        { }
        <div className="lg:col-span-7 relative bg-secondary/10 flex items-center justify-center min-h-[400px] lg:min-h-auto overflow-hidden group">
          { }
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 grayscale transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: "url('https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_studio_map_dark.png')" }}
          />

          { }
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:hidden" />

          { }
          <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
            { }
            <svg
              className="absolute inset-0 w-full h-full drop-shadow-lg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 20 80 Q 50 50 80 20"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                className="opacity-40"
              />
            </svg>

            { }
            <div className="absolute bottom-[15%] left-[15%] flex flex-col items-center animate-pulse">
              <div className="bg-primary text-primary-foreground p-3 rounded-none shadow-lg shadow-primary/10 mb-2">
                <MapPin className="size-6" />
              </div>
              <span className="text-primary font-default font-semibold text-sm tracking-widest bg-background/90 px-3 py-1 rounded-none backdrop-blur-md border border-primary/30">
                HQ
              </span>
            </div>

            { }
            <div className="absolute top-[15%] right-[15%] flex flex-col items-center">
              <div className="bg-background text-primary border border-primary/50 p-4 rounded-none shadow-2xl shadow-primary/5 mb-2 relative">
                <div className="absolute inset-0 rounded-none border border-primary/30 animate-ping opacity-30" />
                <Navigation className="size-8" />
              </div>
              <span className="text-primary font-default font-bold text-base tracking-widest bg-background/95 px-4 py-1.5 rounded-none backdrop-blur-md border border-primary/40 shadow-xl">
                EVENT ZONE STUDIO
              </span>
            </div>

            { }
            <div className="absolute top-8 left-8 bg-background/80 backdrop-blur-md border border-primary/20 p-4 rounded-none shadow-2xl flex items-center gap-4">
              <div className="bg-primary/5 p-2 rounded-none">
                <Clock className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">Studio Hours</p>
                <p className="text-primary font-default font-bold text-lg">10 AM - 8 PM</p>
              </div>
            </div>
          </div>
        </div>

        { }
        <div className="lg:col-span-5 bg-background flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-24 relative z-20">
          { }
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 max-w-xl">
            <Badge
              variant="outline"
              className="mb-8 border-primary/30 text-primary bg-transparent px-4 py-1.5 text-xs uppercase tracking-[0.3em] font-semibold rounded-none"
            >
              Global Presence
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-default font-bold text-foreground mb-6 leading-tight tracking-tighter">
              The Heart of Orchestration
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg sm:text-xl font-serif leading-relaxed mb-10">
              <p>
                Located in the epicenter of luxury, our studio is where vision meets precision. We invite you to experience the EVENT ZONE standard of event architecture in person.
              </p>
              <p>
                From initial concept to final execution, our doors are open for private consultations. Discover how we transform grand ideas into seamless, high-end realities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-default tracking-widest h-14 px-8 rounded-none transition-all duration-500"
              >
                <Link href="/ContactPage">
                  GET DIRECTIONS
                  <Navigation className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm font-default tracking-widest h-14 px-8 bg-transparent rounded-none transition-all duration-500"
              >
                <Link href="/PortfolioPage">
                  OUR PORTFOLIO
                </Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}