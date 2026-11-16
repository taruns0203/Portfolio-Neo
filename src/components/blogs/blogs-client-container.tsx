"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { BlogArticle, BlogCategory, CategoryCount } from "@/data/blogs";
import { CATEGORIES } from "@/data/blogs";
import { BlogFilters } from "@/components/blogs/blog-filters";
import { BlogGrid } from "@/components/blogs/blog-grid";
import { EmptyState } from "@/components/blogs/empty-state";
import { Pagination } from "@/components/blogs/pagination";

import { getBlogResults } from "@/lib/blog-results";

interface BlogsClientContainerProps {
  articles: readonly BlogArticle[];
  categoriesWithCounts: readonly CategoryCount[];
}

function BlogsFilterContent({
  articles,
  categoriesWithCounts,
}: BlogsClientContainerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const currentCategory =
    CATEGORIES.find(
      (category) => category.toLowerCase() === categoryParam?.toLowerCase(),
    ) ?? "All";
  const searchQuery = searchParams.get("search") ?? searchParams.get("q") ?? "";
  const {
    articles: paginatedArticles,
    totalArticles,
    totalPages,
    page: validPage,
  } = getBlogResults(
    articles,
    currentCategory,
    searchQuery,
    searchParams.get("page"),
  );

  function updateURL(
    category: "All" | BlogCategory,
    query: string,
    page: number,
    replace = false,
  ) {
    const params = new URLSearchParams(window.location.search);
    for (const key of ["category", "search", "q", "page"]) params.delete(key);
    if (category !== "All") params.set("category", category.toLowerCase());
    if (query) params.set("search", query);
    if (page > 1) params.set("page", String(page));
    const url = `${pathname}${params.size ? `?${params}` : ""}${window.location.hash}`;
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }

  function handleSelectCategory(category: "All" | BlogCategory) {
    updateURL(category, searchQuery, 1);
  }
  function handleSearchChange(query: string) {
    updateURL(currentCategory, query, 1, true);
  }
  function handleResetFilters() {
    updateURL("All", "", 1);
  }
  function handlePageChange(page: number) {
    updateURL(currentCategory, searchQuery, page);
    document.getElementById("articles-heading")?.focus();
  }

  return (
    <section className="mt-4" aria-labelledby="articles-heading">
      <h2 id="articles-heading" tabIndex={-1} className="sr-only">
        All articles
      </h2>
      <p role="status" className="sr-only">
        {totalArticles} articles found. Page {validPage} of {totalPages}.
      </p>
      {/* Search and Category Filters */}
      <BlogFilters
        categoriesWithCounts={categoriesWithCounts}
        selectedCategory={currentCategory}
        searchQuery={searchQuery}
        onSelectCategory={handleSelectCategory}
        onSearchChange={handleSearchChange}
        onResetFilters={handleResetFilters}
      />

      {/* Grid or Empty State */}
      {paginatedArticles.length > 0 ? (
        <BlogGrid articles={paginatedArticles} />
      ) : (
        <EmptyState
          onResetFilters={handleResetFilters}
          searchQuery={searchQuery}
          selectedCategory={currentCategory}
        />
      )}

      {/* Pagination Bar */}
      {paginatedArticles.length > 0 && (
        <Pagination
          currentPage={validPage}
          totalPages={totalPages}
          totalArticles={totalArticles}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

export function BlogsClientContainer(props: BlogsClientContainerProps) {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center font-mono text-sm text-muted-foreground">
          Loading articles...
        </div>
      }
    >
      <BlogsFilterContent {...props} />
    </Suspense>
  );
}
