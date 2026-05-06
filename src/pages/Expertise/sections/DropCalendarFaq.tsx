"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const faqs = [
  {
    question: "How far in advance should we book?",
    answer:
      "For high-profile corporate galas and luxury weddings, we recommend initiating the consultation process 12 to 18 months in advance to secure the most exclusive venues and elite vendors.",
  },
  {
    question: "Do you manage international events?",
    answer:
      "Yes, EVENT ZONE operates globally. Our team specializes in destination management, handling everything from logistics and customs to local vendor coordination in the world's most prestigious locations.",
  },
  {
    question: "What is included in the consultation?",
    answer:
      "Our initial consultation is a deep dive into your vision. We discuss aesthetic direction, logistical requirements, and budget parameters to create a bespoke conceptual framework for your event.",
  },
  {
    question: "Can you work with our existing partners?",
    answer:
      "While we have a curated network of world-class partners, we are happy to collaborate with your preferred vendors, provided they meet our rigorous standards for quality and professional execution.",
  },
];

export default function DropCalendarFaq() {
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.1 });

  return (
    <section data-section-id="223545"
      id="common-inquiries"
      className="bg-background py-20 md:py-32 px-6 text-foreground"
    >
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-default text-3xl md:text-5xl font-bold text-foreground tracking-tighter mb-4 uppercase">
            Common Inquiries
          </h2>
          <p className="font-default text-lg text-muted-foreground max-w-xl mx-auto tracking-wide">
            Refining the details of your next extraordinary experience with EVENT ZONE.
          </p>
        </div>

        <div className="bg-card/30 rounded-none p-6 md:p-10 shadow-none border border-border/40 backdrop-blur-sm">
          <Accordion type="single" className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-index={i}
                className="border-foreground/10 py-2"
              >
                <AccordionTrigger className="font-default font-bold text-foreground text-left text-lg md:text-xl hover:no-underline hover:text-primary transition-colors tracking-tight">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-default text-base md:text-lg text-muted-foreground leading-relaxed pt-2 pb-6 tracking-normal">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center text-center space-y-6">
          <p className="font-serif text-foreground/60 italic text-xl">
            Seeking a more tailored discussion?
          </p>
          <Button
            size="lg"
            className="font-default font-bold tracking-widest rounded-none px-10 h-14 text-base shadow-none border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all uppercase"
          >
            Book a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}