import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { hasVerifiedMeasurement, performanceMetrics } from "@/data/performance";

export function CoreWebVitalsPanel() {
  const allGood =
    performanceMetrics.length === 3 &&
    performanceMetrics.every(
      (metric) =>
        hasVerifiedMeasurement(metric) && metric.value <= metric.threshold,
    );
  return (
    <Card
      variant="brutalist"
      className="vitals-panel"
      role="group"
      aria-labelledby="vitals-title"
    >
      <div className="vitals-header">
        <Image
          src="/assets/performance/icon-performance.svg"
          width={36}
          height={36}
          alt=""
        />
        <h3 id="vitals-title">Core Web Vitals</h3>
        {allGood && <Badge variant="mint">All Good</Badge>}
      </div>
      <div className="vitals-body">
        <p className="vitals-principle">
          Performance is engineered, not guessed
        </p>
        <dl className="vitals-metrics">
          {performanceMetrics.map((metric) => (
            <div className="vitals-metric" key={metric.id}>
              <dt>
                <abbr title={metric.name}>{metric.id}</abbr>
                <span>{metric.name}</span>
              </dt>
              <dd>
                {hasVerifiedMeasurement(metric) ? (
                  <>
                    <strong className="vitals-value">
                      {metric.value}
                      {metric.unit}
                    </strong>
                    <small className="vitals-source">
                      Source: {metric.source} ·{" "}
                      <time dateTime={metric.measuredAt}>
                        {metric.measuredAt}
                      </time>
                    </small>
                  </>
                ) : null}
                <span className="vitals-threshold">
                  ≤ {metric.threshold}
                  {metric.thresholdUnit}
                </span>
                <span className="vitals-target-label">Good threshold</span>
                <p>{metric.description}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="vitals-note">
          General good thresholds, not my measured results.{" "}
          <a href="https://web.dev/articles/vitals">About Core Web Vitals ↗</a>
        </p>
      </div>
    </Card>
  );
}
