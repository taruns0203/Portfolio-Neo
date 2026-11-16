import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { FeaturedProject } from "@/data/projects";
export interface FeaturedProjectCardProps {
  project: FeaturedProject;
}
export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const title = project.url ? (
    <a href={project.url} className="project-title-link">
      {project.title}
      <Image
        src="/assets/experience-projects/icon-arrow-up-right.svg"
        width={20}
        height={20}
        alt=""
      />
    </a>
  ) : (
    project.title
  );
  return (
    <article aria-labelledby={`project-${project.id}`}>
      <Card variant="elevated" className="featured-project">
        <div className={`project-preview project-preview-${project.tone}`}>
          <Image
            src={`/assets/experience-projects/${project.image}`}
            width={project.imageWidth}
            height={project.imageHeight}
            sizes="(min-width: 1728px) 370px, (min-width: 1440px) 23vw, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            alt={`Illustrated preview of the ${project.title} project`}
          />
        </div>
        <div className="project-copy">
          <h3 id={`project-${project.id}`}>{title}</h3>
          <p>{project.description}</p>
          <ul
            className="project-tags"
            aria-label={`${project.title} technologies`}
          >
            {project.tags.map((tag, index) => (
              <li key={tag}>
                <Badge
                  variant={(["lavender", "yellow", "mint"] as const)[index % 3]}
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </article>
  );
}
