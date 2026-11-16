import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalArticles,
  onPageChange,
}: PaginationProps) {
  const showPageNumbers = totalPages > 1;

  return (
    <nav
      className="mt-14 pt-8 border-t-2 border-border-strong flex flex-col md:flex-row items-center justify-between gap-6"
      aria-label="Blog pagination and navigation"
    >
      {/* Left: Back to Portfolio button */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 bg-surface text-foreground font-sans text-sm font-bold px-4 py-2.5 rounded-md border-2 border-border-strong shadow-[2px_2px_0px_var(--color-border-strong)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pressed active:translate-x-1 active:translate-y-1 transition-all"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        BACK TO PORTFOLIO
      </Link>

      {/* Center: Numeric Page Buttons (only shown when totalPages > 1) */}
      {showPageNumbers ? (
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Page selection"
        >
          {/* Previous Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Go to previous page"
            className="pagination-btn"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => {
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`pagination-btn ${isActive ? "active" : ""}`}
                >
                  {pageNum}
                </button>
              );
            },
          )}

          {/* Next Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Go to next page"
            className="pagination-btn"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* Right: Article Count */}
      <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-foreground">
        <span>{totalArticles}</span>
        <span className="uppercase">
          {totalArticles === 1 ? "ARTICLE" : "ARTICLES"}
        </span>
        <span className="text-muted-foreground select-none" aria-hidden="true">
          {"///"}
        </span>
      </div>
    </nav>
  );
}
