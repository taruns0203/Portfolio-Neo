import Image from "next/image";

export function PerformanceIllustration() {
  return (
    <div className="performance-art" aria-hidden="true">
      <Image
        src="/assets/performance/decor-yellow-orb.svg"
        width={420}
        height={420}
        alt=""
        className="performance-orb"
      />
      <Image
        src="/assets/performance/rocket-speedometer-illustration.svg"
        width={850}
        height={650}
        alt=""
        className="performance-rocket"
      />
    </div>
  );
}
