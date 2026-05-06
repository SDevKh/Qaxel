"use client";

import * as React from "react";

import { Input } from "../ui/input";
import { WP_Query } from "@/integrations/wordpress/wp_query";

interface ProductsSearchProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export function ProductsSearch({
    value,
    onChange,
    className,
    placeholder = "Search products",
}: ProductsSearchProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={className}>
            <Input
                type="search"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
}

/**
 * Hook to create a properly configured WP_Query for product search.
 * WordPress uses "s" for search queries. When empty, returns a query
 * with per_page: 0 to avoid fetching all products.
 *
 * @param searchValue - The current search input value
 * @returns [wp_query, hasSearchQuery] tuple (like useState)
 */
export function useWPQueryForSearch(searchValue: string): [WP_Query, boolean] {
    const [wp_query, setWPQuery] = React.useState(() => new WP_Query({ s: "", per_page: 0 }));

    React.useEffect(() => {
        const term = searchValue.trim();
        setWPQuery(new WP_Query(term ? { s: term } : { s: "", per_page: 0 }));
    }, [searchValue]);

    const hasSearchQuery = searchValue.trim() !== "";

    return [wp_query, hasSearchQuery];
}
