import Image from "next/image";
import { Card } from "@/components/ui/card";

export function PerformanceComparison() {
  return (
    <Card variant="colored" className="performance-comparison">
      <div className="performance-comparison-title">
        <Image
          src="/assets/performance/icon-trending-up.svg"
          width={36}
          height={36}
          alt=""
        />
        <h3>Performance Improvement</h3>
      </div>
      <p className="performance-comparison-lead">
        Measured impact across real projects.
      </p>
      <p>
        At Movingful, AWS AppSync integration reduced redundant network requests
        by 30%. At Junk.com, memoization, lazy loading, and code splitting
        helped achieve a resume-reported 90+ page speed score. These are project
        outcomes, not field Core Web Vitals measurements.
      </p>
      <ol className="performance-process" aria-label="Optimization process">
        <li>
          <span>01</span> Measure
        </li>
        <li>
          <span>02</span> Optimize
        </li>
        <li>
          <span>03</span> Validate
        </li>
      </ol>
    </Card>
  );
}
