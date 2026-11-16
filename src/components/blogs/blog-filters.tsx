"use client";

import { Search, X, RotateCcw } from "lucide-react";
import type { BlogCategory } from "@/data/blogs";
import type { CategoryCount } from "@/data/blogs";

interface BlogFiltersProps {
  categoriesWithCounts: readonly CategoryCount[];
  selectedCategory: "All" | BlogCategory;
  searchQuery: string;
  onSelectCategory: (category: "All" | BlogCategory) => void;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
}

export function BlogFilters({
  categoriesWithCounts,
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onSearchChange,
  onResetFilters,
}: BlogFiltersProps) {
  const isFiltered = selectedCategory !== "All" || searchQuery.trim() !== "";

  return (
    <section className="mb-10 space-y-6" aria-label="Blog filters and search">
      {/* Top Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Topic Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 mr-1 font-mono text-xs font-bold uppercase tracking-wider text-foreground select-none">
            <span>BROWSE BY TOPIC</span>
            <span className="text-muted-foreground">/</span>
            <span aria-hidden="true">→</span>
          </div>

          {categoriesWithCounts.map(({ name, count }) => {
            const isActive = selectedCategory === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => onSelectCategory(name)}
                className={`topic-chip ${isActive ? "active" : ""}`}
                aria-pressed={isActive}
              >
                <span>{name === "All" ? "All Articles" : name}</span>
                <span className="font-mono text-xs opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input & Reset */}
        <div className="flex items-center gap-2 w-full lg:w-auto lg:min-w-[320px]">
          <div className="relative flex-1 min-w-0">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles by title, excerpt, category, or tags"
              className="w-full pl-10 pr-9 py-2.5 bg-surface border-2 border-border-strong rounded-md text-sm font-sans font-medium text-foreground placeholder:text-muted-foreground shadow-[2px_2px_0px_var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-border-strong"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search text"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              aria-label="Reset all filters and search"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-3 py-2.5 bg-disabled text-foreground border-2 border-border-strong rounded-md font-mono text-xs font-bold shadow-[2px_2px_0px_var(--color-border-strong)] hover:bg-disabled/80 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
