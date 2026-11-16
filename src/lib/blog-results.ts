import type { BlogArticle, BlogCategory } from "../data/blogs";

export function getBlogResults(
  articles: readonly BlogArticle[],
  category: "All" | BlogCategory,
  search: string,
  requestedPage: string | null,
) {
  const query = search.trim().toLowerCase();
  const filtered = articles.filter(
    (article) =>
      (category === "All" || article.category === category) &&
      [article.title, article.excerpt, article.category, ...article.tags].some(
        (text) => text.toLowerCase().includes(query),
      ),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / 6));
  const parsed = Number(requestedPage);
  const page = Math.min(
    totalPages,
    Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1,
  );
  return {
    articles: filtered.slice((page - 1) * 6, page * 6),
    totalArticles: filtered.length,
    totalPages,
    page,
  };
}
