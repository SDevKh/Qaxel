"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/components/common/Link";

declare global {
    interface Window {
        wvcClient: any;
    }
}

interface CartIconProps {
    /** Additional class names for the button wrapper */
    className?: string;
    /** Icon size class (e.g., "size-5", "size-6") */
    iconSize?: string;
    /** Button variant */
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    /** Button size */
    size?: "default" | "sm" | "lg" | "icon";
    /** Show loading state */
    showLoading?: boolean;
}

/**
 * CartIcon component that displays a shopping cart icon with item count badge.
 *
 * Features:
 * - Automatically fetches and displays cart item count using wvcClient.cart.currentState()
 * - Navigates to cart page when clicked using wvcClient.cart.goToCart()
 * - Shows a badge with total item count
 * - Supports all Button component variants and sizes
 * - Handles loading and error states gracefully
 *
 * @example
 * ```tsx
 * // Basic usage in header
 * <CartIcon variant="ghost" size="icon" />
 *
 * // With custom styling
 * <CartIcon
 *   variant="outline"
 *   className="ml-4"
 *   iconSize="size-6"
 * />
 * ```
 */
export function CartIcon({
    className,
    iconSize = "size-4",
    variant = "ghost",
    size = "icon",
    showLoading = true,
}: CartIconProps) {
    const [itemCount, setItemCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cartUrl, setCartUrl] = useState('#');
    const [isNewTab, setIsNewTab] = useState(false);



    const fetchCartCount = useCallback(async () => {
        try {
            if (typeof window !== "undefined" && window.wvcClient?.cart) {
                const response = await window.wvcClient.cart.currentState?.();
                const total = response?.count ?? 0;
                setItemCount(total);
            }
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
            setItemCount(0);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCartCount();

        const handleCartUpdate = () => {
            console.log("Cart updated - refreshing count");
            fetchCartCount();
        };

        document.addEventListener("wvc_cart_updated", handleCartUpdate);

        return () => {
            document.removeEventListener("wvc_cart_updated", handleCartUpdate);
        };
    }, [fetchCartCount]);

    useEffect(() => {
        async function fetchCartUrl() {
            try {
                if (typeof window !== "undefined" && window.wvcClient?.cart) {
                    const urls = await window.wvcClient.cart.getUrls?.()
                    console.log("urls:", urls)
                    const url = urls?.cart || "#";
                    setCartUrl(url);
                    if (window.wvcClient.cart.options?.cartOpenInNewTab)
                        setIsNewTab(true)
                }
            }
            catch (error) {
                // console.error("Failed to fetch cart URLs:", error);
            }
        }

        fetchCartUrl();
    }, [window.wvcClient?.cart]);






    return (
        <Link
            className={cn("relative", className)}
            to={cartUrl}
            newTab={isNewTab}
        >
            <ShoppingCart className={iconSize} />

            {!isLoading && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-3 h-3 bg-red-600 rounded-full flex items-center justify-center px-1 text-[11px] font-semibold text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                </span>
            )}

            {showLoading && isLoading && (
                <span className="absolute -top-1 -right-1 size-2 bg-primary rounded-full animate-pulse" />
            )}
        </Link>
    );
}