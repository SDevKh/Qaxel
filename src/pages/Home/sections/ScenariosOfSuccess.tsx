import React from "react";
import { Plane, Briefcase, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const scenarios = [
  {
    id: "corporate-events",
    title: "Corporate Galas",
    subtitle: "Architectural Precision",
    description: "We transform corporate objectives into immersive physical experiences. From high-stakes product launches to annual shareholder summits, our team orchestrates every detail with surgical precision, ensuring your brand's prestige is reflected in every interaction and aesthetic choice.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_corporate_gala.png",
    imageAlt: "A minimalist corporate event space with sharp lighting and deep charcoal accents",
    proTipTitle: "The Executive Touch",
    proTipText: "Integrate subtle brand motifs into the lighting design rather than overt signage for a more sophisticated, high-end atmosphere.",
    icon: Briefcase,
    reverse: false,
  },
  {
    id: "luxury-weddings",
    title: "Luxury Weddings",
    subtitle: "Timeless Sophistication",
    description: "For the discerning couple, we curate weddings that transcend trends. Our approach blends heritage-inspired elegance with modern minimalism, creating a sanctuary of celebration. Every floral arrangement and table setting is a testament to refined taste and exclusive luxury.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_luxury_wedding.png",
    imageAlt: "A champagne gold themed wedding reception with crisp white floral arrangements",
    proTipTitle: "The Golden Hour",
    proTipText: "Utilize warm champagne lighting during the transition from ceremony to reception to create a seamless, cinematic flow for guests.",
    icon: Sparkles,
    reverse: true,
  },
  {
    id: "private-soirees",
    title: "Private Soirées",
    subtitle: "Exclusive Intimacy",
    description: "Private celebrations demand a level of discretion and detail that only EVENT ZONE can provide. Whether an intimate dinner in a historic estate or a high-energy rooftop gathering, we manage the logistics so you can focus on the art of hosting and connection.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/evenex_private_soiree.png",
    imageAlt: "An intimate private dinner party with minimalist table settings and platinum accents",
    proTipTitle: "The Guest Journey",
    proTipText: "Design the entry sequence to build anticipation, using scent and sound to immediately transport guests into your curated world.",
    icon: Plane,
    reverse: false,
  },
];

function ScenarioBlock({ scenario, index }: { scenario: typeof scenarios[0]; index: number }) {
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.1 });
  const Icon = scenario.icon;

  return (
    <div
      ref={ref}
      data-index={index}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
    >
      {/* Image */}
      <div className={`order-1 ${scenario.reverse ? "lg:order-2" : "lg:order-1"}`}>
        <div className="relative aspect-[4/5] w-full overflow-hidden group">
          {/* Decorative frame */}
          <div className={`absolute ${scenario.reverse ? '-left-3 -top-3' : '-right-3 -top-3'} w-full h-full border border-primary/15 z-0 transition-all duration-700 group-hover:border-primary/25`} />
          <div className="relative z-10 w-full h-full overflow-hidden bg-muted/10">
            <img
              src={scenario.image}
              alt={scenario.imageAlt}
              className="w-full h-full object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-60" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`order-2 flex flex-col justify-center ${scenario.reverse ? "lg:order-1" : "lg:order-2"}`}>
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 border border-primary/20 bg-primary/5 text-primary mb-6">
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <h3 className="text-3xl md:text-4xl font-default font-bold mb-2 tracking-tight">
            {scenario.title}
          </h3>
          <p className="text-lg text-primary/80 font-serif italic mb-6 tracking-wide">
            {scenario.subtitle}
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-[1.8] font-default font-light">
            {scenario.description}
          </p>
        </div>

        {/* Expert insight card */}
        <Card className="bg-primary/[0.03] border-primary/10 rounded-none shadow-none relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/30" />
          <CardHeader className="pb-2 pl-6">
            <CardTitle className="text-[11px] font-default tracking-[0.2em] uppercase text-primary/70 flex items-center gap-2">
              Expert Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-6">
            <h4 className="text-base font-default font-semibold mb-1.5 text-foreground">
              {scenario.proTipTitle}
            </h4>
            <p className="text-muted-foreground leading-relaxed font-default text-sm font-light">
              {scenario.proTipText}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ScenariosOfSuccess() {
  const { ref: headerRef, isVisible: headerVisible } = useRevealOnScroll({ threshold: 0.1 });

  return (
    <section data-section-id="241041"
      id="our-expertise"
      className="bg-background text-foreground py-28 lg:py-36 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-24 lg:mb-32 transition-all duration-1000 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center justify-center gap-2.5 mb-5">
            <span className="w-8 h-px bg-primary/40" />
            <span className="text-[11px] font-default font-medium tracking-[0.25em] uppercase text-muted-foreground">
              The EVENT ZONE Standard
            </span>
            <span className="w-8 h-px bg-primary/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-default font-bold tracking-tighter mb-6">
            Our Expertise
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-default max-w-xl mx-auto">
            Mastering the art of event orchestration — blending architectural minimalism with high-contrast luxury.
          </p>
        </div>

        {/* Scenarios */}
        <div className="flex flex-col gap-28 lg:gap-40">
          {scenarios.map((scenario, i) => (
            <ScenarioBlock key={scenario.id} scenario={scenario} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}