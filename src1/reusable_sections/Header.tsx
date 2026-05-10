"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/components/common/Link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const staticMenuItems = [
    { id: "1", label: "The Portfolio", href: "/PortfolioPage" },
    { id: "2", label: "Our Expertise", href: "/ExpertisePage" },
    { id: "3", label: "Contact", href: "/ContactPage" },
];

function DesktopMenuConsumer() {
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-10">
                {staticMenuItems.map((item, i) => (
                    <NavigationMenuItem key={item.id} data-index={i}>
                        <Link
                            to={item.href}
                            className="group/nav-link relative bg-transparent font-default text-foreground/60 hover:text-foreground tracking-[0.18em] uppercase text-[11px] transition-all duration-500 px-3 py-2 flex items-center"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-3 w-0 h-px bg-primary group-hover/nav-link:w-[calc(100%-1.5rem)] transition-all duration-500 ease-out" />
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function MobileMenuConsumer({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-0 w-full bg-background/98 backdrop-blur-2xl border-b border-border/50 p-6 flex flex-col gap-1 md:hidden shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)]">
            {staticMenuItems.map((item, i) => (
                <div key={item.id} data-index={i} className="flex flex-col">
                    <Link
                        to={item.href}
                        className="py-4 px-5 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-primary/5 font-default uppercase tracking-[0.2em] transition-all duration-300 border-b border-border/30 last:border-b-0"
                        onClick={() => setIsOpen(false)}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
            <div className="mt-6 pt-4 border-t border-border/50 px-2">
                <Link
                    to="/ContactPage"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full rounded-none border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 font-default uppercase tracking-[0.2em] text-xs h-12 flex items-center justify-center"
                    )}
                    onClick={() => setIsOpen(false)}
                >
                    Book a Consultation
                </Link>
            </div>
        </div>
    );
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a[href]") as HTMLAnchorElement | null;

            if (anchor) {
                const href = anchor.getAttribute("href");
                if (!href) return;

                if (href === "/#") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }

                let hash = "";
                if (href.startsWith("#")) {
                    hash = href;
                } else if (href.startsWith("/") && href.includes("#")) {
                    const [path, hashPart] = href.split("#");
                    if (hashPart === "") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                    }
                    if (path === "/" || path === window.location.pathname) {
                        hash = "#" + hashPart;
                    }
                }

                if (hash && hash !== "#") {
                    const element = document.querySelector(hash);
                    if (element) {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                        setIsMobileMenuOpen(false);
                    }
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);
        return () => document.removeEventListener("click", handleAnchorClick);
    }, []);

    return (
        <section data-section-id="221703"
            id="header"
            className={`dark sticky top-0 z-50 w-full transition-all duration-700 ease-out border-b ${isScrolled
                    ? "bg-background/85 backdrop-blur-2xl border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
                    : "bg-background border-transparent"
                }`}
        >
            <div className="container mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <Link to="/HomePage" className="flex items-center group">
                        <div className="flex flex-col items-center justify-center select-none origin-left bg-transparent px-1 py-1">
                            <div className="flex items-baseline gap-0">
                                <span className="text-[#00aeef] font-serif text-[2.2rem] md:text-[2.5rem] font-bold leading-none tracking-tight" style={{ textShadow: "1px 1px 8px rgba(0,174,239,0.2)" }}>E</span>
                                <span className="text-foreground font-serif text-[2.2rem] md:text-[2.5rem] font-bold leading-none -ml-[3px]">Z</span>
                            </div>
                            <div className="font-serif text-[0.65rem] md:text-[0.72rem] tracking-[0.25em] text-foreground/80 leading-none border-t border-foreground/15 pt-[5px] mt-[3px] uppercase">
                                EVENT ZONE
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex flex-1 justify-center">
                    <DesktopMenuConsumer />
                </div>

                {/* CTA Button */}
                <div className="hidden md:flex flex-shrink-0 items-center">
                    <Link
                        to="/ContactPage"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "rounded-none border-primary/30 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 font-default px-7 uppercase tracking-[0.18em] text-[10px] h-10 flex items-center justify-center"
                        )}
                    >
                        Book a Consultation
                    </Link>
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground hover:bg-primary/10 rounded-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            <MobileMenuConsumer isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </section>
    );
}