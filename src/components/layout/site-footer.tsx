import { Container } from "@/components/ui/container";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="contact-footer">
      <Container className="max-w-home">
        <p>
          {site.name} <span>· {site.role}</span>
        </p>
        <a href="#main-content">Back to top ↑</a>
      </Container>
    </footer>
  );
}
