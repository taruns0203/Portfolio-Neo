import Image from "next/image";

export function BlogHero() {
  return (
    <section
      className="relative pt-8 pb-12 md:pt-14 md:pb-16"
      aria-labelledby="journal-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Eyebrow with decorative rays */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase text-foreground bg-lavender-surface border border-border-strong px-3 py-1 rounded-sm shadow-[2px_2px_0px_var(--color-border-strong)]">
              THE ENGINEERING
            </span>
            <span
              className="font-mono text-lg font-bold text-muted-foreground select-none"
              aria-hidden="true"
            >
              {"///"}
            </span>
          </div>

          {/* Giant Headline */}
          <h1
            id="journal-heading"
            className="blog-hero-title text-foreground tracking-tighter my-3"
          >
            JOURNAL
            <span className="blog-hero-highlight" aria-hidden="true">
              /
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base md:text-xl text-muted-foreground max-w-xl font-medium leading-relaxed mt-2">
            Technical deep-dives, architecture notes, frontend craft, and
            lessons from real projects.
          </p>

          {/* Neo-brutalist indicator line with sparkle */}
          <div
            className="flex items-center gap-2 mt-6 select-none"
            aria-hidden="true"
          >
            <span className="h-1 w-12 bg-border-strong rounded-full" />
            <span className="text-xl text-yellow">✦</span>
            <span className="h-1 w-6 bg-yellow rounded-full" />
          </div>
        </div>

        {/* Right Artwork */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="blog-hero-artwork-frame relative w-full max-w-[500px] aspect-[800/520]">
            <Image
              src="/images/blogs/hero-engineering-journal.svg"
              alt="Retro engineering workstation illustration with code monitor, coffee mug, and technical books"
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
