import Image from "next/image";
import { about } from "@/data/about";
export function AboutMetrics() {
  return (
    <dl className="about-metrics" aria-label="Professional highlights">
      {about.metrics.map((metric) => (
        <div key={metric.label}>
          <dt>
            <span className={`about-metric-icon about-tone-${metric.tone}`}>
              <Image
                src={`/assets/about/${metric.icon}`}
                width={30}
                height={30}
                alt=""
              />
            </span>
            <span>{metric.label}</span>
          </dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
