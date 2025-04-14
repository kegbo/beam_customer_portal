"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { SearchInputEl, SearchInputWrapper } from "./SearchInput.style";

interface SearchInputProp {
  placeholder?: string;
  variant?: "ghost" | "primary";
}

export const SearchInput: React.FC<SearchInputProp> = ({
  placeholder,
  variant = "primary",
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const pathname = usePathname(); // Get current path
  const searchParams = useSearchParams(); // Get query params
  const router = useRouter();

  const updateQuery = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("keyword", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false }); // Push updated query string
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      updateQuery(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <SearchInputWrapper>
      <SearchInputEl
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon width={12} height={12} />
    </SearchInputWrapper>
  );
};
