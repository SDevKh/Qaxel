import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/common/Link";

export default function WhereStoriesComeAlive() {
  return (
    <section data-section-id="221486"
      id="the-consultation"
      className="relative w-full overflow-hidden dark bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

          { }
          <div className="space-y-8 lg:col-span-7">
            <h1 className="font-default text-foreground text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              Your Legacy Starts{" "}
              <span className="text-primary font-serif italic">Here</span>
            </h1>

            <p className="font-default text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl tracking-wide">
              Experience the pinnacle of event orchestration. We invite you to a private consultation to discuss your vision for corporate excellence, luxury weddings, or exclusive private galas.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button size="lg" className="rounded-none px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" asChild>
                <Link to="/ContactPage">Book a Consultation</Link>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-none px-6 text-primary hover:text-primary/80" asChild>
                <Link to="/ExpertisePage">
                  Our Expertise <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          { }
          <div className="relative lg:col-span-5 lg:pl-10">
            { }
            <div className="bg-primary/10 absolute -inset-x-4 -inset-y-4 -z-10 translate-x-6 translate-y-6 transform rounded-none md:-inset-x-8 md:-inset-y-8 md:translate-x-8 md:translate-y-8"></div>

            { }
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none shadow-2xl">
              <img
                src="https://wpvc-images.s3.us-east-1.amazonaws.com/images/1662897/img/luxury_gold_invitation_detail.png"
                alt="High-contrast luxury event invitation with gold foil detailing"
                className="h-full w-full object-cover grayscale contrast-125"
              />
              { }
              <div className="border-primary/30 pointer-events-none absolute inset-0 rounded-none border"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}