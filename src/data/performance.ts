export interface PerformanceMetric {
  id: "LCP" | "INP" | "CLS";
  name: string;
  description: string;
  threshold: number;
  thresholdUnit: "s" | "ms" | "";
  /** Optional observed value; units must match thresholdUnit. */
  value?: number;
  unit?: "s" | "ms" | "";
  source?: string;
  measuredAt?: string;
  verified?: boolean;
}

export interface PerformanceHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  tone: "yellow" | "mint" | "lavender" | "pink";
}

// General good thresholds, not portfolio measurements. Add sourced results here.
export const performanceMetrics: PerformanceMetric[] = [
  {
    id: "LCP",
    name: "Largest Contentful Paint",
    description: "How quickly the main content appears.",
    threshold: 2.5,
    thresholdUnit: "s",
  },
  {
    id: "INP",
    name: "Interaction to Next Paint",
    description: "How quickly a page responds to input.",
    threshold: 200,
    thresholdUnit: "ms",
  },
  {
    id: "CLS",
    name: "Cumulative Layout Shift",
    description: "How stable the layout stays as it loads.",
    threshold: 0.1,
    thresholdUnit: "",
  },
];

export function hasVerifiedMeasurement(
  metric: PerformanceMetric,
): metric is PerformanceMetric & {
  value: number;
  source: string;
  measuredAt: string;
} {
  return (
    metric.verified === true &&
    typeof metric.value === "number" &&
    Number.isFinite(metric.value) &&
    metric.value >= 0 &&
    metric.unit === metric.thresholdUnit &&
    Boolean(metric.source?.trim()) &&
    Boolean(metric.measuredAt?.trim()) &&
    Number.isFinite(Date.parse(metric.measuredAt ?? ""))
  );
}

export const performanceHighlights: PerformanceHighlight[] = [
  {
    id: "loading",
    title: "Faster Loading",
    description: "Caching, lazy loading & thoughtful code splitting.",
    icon: "icon-stopwatch.svg",
    tone: "yellow",
  },
  {
    id: "seo",
    title: "Better SEO",
    description: "Server-rendered content built for discovery.",
    icon: "icon-layers.svg",
    tone: "mint",
  },
  {
    id: "ux",
    title: "Smoother UX",
    description: "Responsive interactions & stable layouts.",
    icon: "icon-users.svg",
    tone: "lavender",
  },
  {
    id: "delivery",
    title: "Performance-Focused Delivery",
    description: "Measure, optimize & validate the impact.",
    icon: "icon-rocket.svg",
    tone: "pink",
  },
];
