export interface SiteDestination {
  label: string;
  href: string;
  /** A real local dialog target until the corresponding section is implemented. */
  noticeId?: string;
}

// Replace null with verified public URLs. Never guess someone's profile or email.
const profileLinks: { github: string | null; contact: string | null } = {
  github: "https://github.com/taruns0203",
  contact: "mailto:taruns117@gmail.com",
};

const plannedSection = (label: string, id: string): SiteDestination => ({
  label,
  href: `#${id}`,
  noticeId: id,
});

const destinations = {
  about: { label: "About", href: "#about" },
  work: { label: "Work", href: "#work" },
  experience: { label: "Experience", href: "#experience" },
  blogs: { label: "Blogs", href: "/blogs" },
  writing: { label: "Writing", href: "#writing" },
  contact: { label: "Contact", href: "#contact" },
  github: profileLinks.github
    ? { label: "GitHub", href: profileLinks.github }
    : plannedSection("GitHub", "github"),
} satisfies Record<string, SiteDestination>;

export const site = {
  url: "https://tarunsharma.dev",
  name: "Tarun Sharma",
  role: "Senior Full Stack Engineer",
  description:
    "Tarun Sharma — Senior Full Stack Engineer with 6+ years building React, Next.js, TypeScript, and Node.js platforms, secure authentication, and AWS serverless systems.",
  profileLinks,
  contact: {
    email: profileLinks.contact?.startsWith("mailto:")
      ? profileLinks.contact.slice(7)
      : null,
    location: "Kota, Rajasthan, India",
    phone: "+91-7976864475",
    phoneHref: "tel:+917976864475",
    socials: [
      {
        name: "LinkedIn",
        icon: "social-linkedin.svg",
        href: "https://www.linkedin.com/in/tarunsharma",
      },
      { name: "GitHub", icon: "social-github.svg", href: profileLinks.github },
      { name: "X", icon: "social-x.svg", href: null },
      { name: "YouTube", icon: "social-youtube.svg", href: null },
      { name: "Instagram", icon: "social-instagram.svg", href: null },
    ],
  },
  destinations,
  navigation: [
    destinations.about,
    destinations.work,
    destinations.experience,
    destinations.blogs,
    destinations.contact,
  ],
  hero: {
    availability: "Available for new opportunities",
    headline: {
      first: "Building",
      second: "Beyond the",
      highlight: "Browser.",
    },
    description:
      "Senior Full Stack Engineer with 6+ years building and scaling production platforms with React, Next.js, TypeScript, and Node.js—from secure authentication to fast, reliable user experiences.",
    workLabel: "View My Work",
    githubLabel: "GitHub",
    contactLabel: "Let’s Talk",
    skills: [
      { label: "React", icon: "tech-react.svg" },
      { label: "Next.js", icon: "tech-nextjs.svg" },
      { label: "TypeScript", icon: "tech-typescript.svg" },
      { label: "Tailwind", icon: "tech-tailwind.svg" },
      { label: "Performance", icon: "tech-performance.svg" },
    ],
  },
} as const;
