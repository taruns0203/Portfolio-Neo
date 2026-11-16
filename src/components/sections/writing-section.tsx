import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WritingIntro } from "@/components/writing/writing-intro";
import { ArticleCard } from "@/components/writing/article-card";
import { articles } from "@/data/articles";

export function WritingSection() {
  return (
    <Section
      decoration="writing"
      id="writing"
      aria-labelledby="writing-heading"
    >
      <Container className="writing-layout max-w-home">
        <WritingIntro />
        <div className="writing-grid">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
