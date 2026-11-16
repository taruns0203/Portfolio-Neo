import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  onResetFilters: () => void;
  searchQuery?: string;
  selectedCategory?: string;
}

export function EmptyState({
  onResetFilters,
  searchQuery,
  selectedCategory,
}: EmptyStateProps) {
  return (
    <div
      className="p-8 md:p-14 text-center border-3 border-dashed border-border-strong rounded-xl bg-surface/80 my-8 shadow-brutalist"
      role="status"
      aria-live="polite"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow border-2 border-border-strong flex items-center justify-center shadow-[2px_2px_0px_var(--color-border-strong)]">
        <SearchX className="w-8 h-8 text-foreground" aria-hidden="true" />
      </div>

      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
        No articles found
      </h3>

      <p className="mt-2 text-muted-foreground max-w-md mx-auto text-sm md:text-base leading-relaxed">
        {searchQuery ? (
          <>
            No matches for &ldquo;<strong>{searchQuery}</strong>&rdquo;
            {selectedCategory && selectedCategory !== "All" && (
              <>
                {" "}
                in <strong>{selectedCategory}</strong>
              </>
            )}
            . Try adjusting your search query or clear the filter.
          </>
        ) : (
          "There are no articles currently listed in this category."
        )}
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 bg-yellow text-foreground font-sans text-sm font-bold px-5 py-3 rounded-md border-2 border-border-strong shadow-brutalist hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pressed active:translate-x-1 active:translate-y-1 transition-all"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          RESET ALL FILTERS
        </button>
      </div>
    </div>
  );
}
