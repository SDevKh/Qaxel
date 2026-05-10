"use client";

import React from "react";
import { ArrowUp, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/common/Link";
import { cn } from "@/lib/utils";

const navLinks = [
    { id: "1", label: "Home", href: "/HomePage" },
    { id: "2", label: "The Portfolio", href: "/PortfolioPage" },
    { id: "3", label: "Our Expertise", href: "/ExpertisePage" },
    { id: "4", label: "Contact", href: "/ContactPage" },
];

const socials = [
    { id: "ig", label: "Instagram", icon: ExternalLink, href: "https://www.instagram.com/eventzone_dme" },
    { id: "tw", label: "Twitter", icon: ExternalLink, href: "#" },
    { id: "in", label: "LinkedIn", icon: ExternalLink, href: "#" },
    { id: "yt", label: "YouTube", icon: ExternalLink, href: "#" },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section data-section-id="230395"
            id="footer"
            className="bg-background text-foreground border-t border-border/40 relative overflow-hidden"
        >
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

                    {/* Brand column */}
                    <div className="flex flex-col gap-7 lg:col-span-4 lg:pr-8">
                        <Link to="/HomePage" className="inline-block w-fit group">
                            <div className="flex flex-col items-center justify-center select-none origin-left">
                                <div className="flex items-baseline gap-0">
                                    <span className="text-[#00aeef] font-serif text-[2.6rem] font-bold leading-none tracking-tight" style={{ textShadow: "1px 1px 8px rgba(0,174,239,0.2)" }}>E</span>
                                    <span className="text-foreground font-serif text-[2.6rem] font-bold leading-none -ml-[3px]">Z</span>
                                </div>
                                <div className="font-serif text-[0.72rem] tracking-[0.25em] text-foreground/80 leading-none border-t border-foreground/15 pt-[5px] mt-[3px] uppercase">
                                    EVENT ZONE
                                </div>
                            </div>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed text-sm font-default max-w-sm">
                            Premier event orchestration for luxury weddings, corporate galas, and exclusive private experiences — curated with architectural precision.
                        </p>
                        {/* Social icons row */}
                        <div className="flex items-center gap-4 mt-1">
                            {socials.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="group/social w-10 h-10 flex items-center justify-center border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-400"
                                    >
                                        <Icon className="w-4 h-4 text-muted-foreground group-hover/social:text-primary transition-colors duration-300" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation column */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        <h3 className="font-default font-semibold text-xs uppercase tracking-[0.2em] text-foreground/60 mb-1">Navigation</h3>
                        <ul className="flex flex-col gap-3.5">
                            {navLinks.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-default text-sm tracking-wide"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info column */}
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <h3 className="font-default font-semibold text-xs uppercase tracking-[0.2em] text-foreground/60 mb-1">Get in Touch</h3>
                        <div className="flex flex-col gap-5 text-sm font-default">
                            <div>
                                <p className="text-foreground/90 font-medium mb-1.5">Headquarters</p>
                                <p className="text-muted-foreground leading-relaxed">1, Opp. Keshopura Govt. School</p>
                                <p className="text-muted-foreground leading-relaxed">Ajmer Road, Keshopura, Jaipur</p>
                            </div>
                            <div>
                                <p className="text-foreground/90 font-medium mb-1.5">Inquiries</p>
                                <a href="mailto:eventzone3@gmail.com" className="text-muted-foreground hover:text-primary transition-colors duration-300 block">eventzone3@gmail.com</a>
                                <a href="tel:+917426809415" className="text-muted-foreground hover:text-primary transition-colors duration-300 block mt-0.5">+91 7426 809 415</a>
                            </div>
                        </div>
                    </div>

                    {/* CTA Column */}
                    <div className="flex flex-col gap-6 lg:col-span-3">
                        <h3 className="font-default font-semibold text-xs uppercase tracking-[0.2em] text-foreground/60 mb-1">Start Your Journey</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed font-default">
                            Ready to create something extraordinary? Let us bring your vision to life.
                        </p>
                        <Link
                            to="/ContactPage"
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "w-full rounded-none border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-default uppercase tracking-[0.18em] text-[10px] h-11 transition-all duration-500 mt-1 flex items-center justify-center"
                            )}
                        >
                            Book a Consultation
                        </Link>
                        <p className="text-muted-foreground/60 text-xs font-default italic text-center lg:text-left">By appointment only</p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border/30 gap-6">
                    <p className="text-muted-foreground/60 text-xs font-default tracking-wide">
                        &copy; {new Date().getFullYear()} EVENT ZONE by Design Media & Events. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "rounded-none text-muted-foreground hover:text-primary font-default uppercase tracking-[0.15em] text-[10px] h-9 px-4 transition-all duration-500 group"
                        )}
                    >
                        Back to Top
                        <ArrowUp className="ml-2 size-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
}