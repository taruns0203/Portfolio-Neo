export type CurrentWorkTone = "pink" | "yellow" | "mint" | "lavender";

export interface CurrentWorkFeature {
  id: string;
  title: string;
  detail?: string;
  icon: string;
  tone: CurrentWorkTone;
}

export interface CurrentWorkProject {
  name: string;
  summary: string;
  subtitle: string;
  status: "In Development";
  audience: string;
  targetMarkets: readonly string[];
  progressPercent: number | null;
  focusAreas: readonly CurrentWorkFeature[];
}

// Supplied project brief. No verified completion percentage or active pilot.
export const currentWork: CurrentWorkProject = {
  name: "Nuvexa",
  summary:
    "I'm building Nuvexa, an AI-powered real estate CRM designed to make it easier for builders and agents to manage leads, visits, inventory, bookings and follow-ups.",
  subtitle: "AI-powered Real Estate CRM for Builders & Agents",
  status: "In Development",
  audience: "Builders & Agents",
  targetMarkets: ["Kota", "Jaipur"],
  progressPercent: null,
  focusAreas: [
    {
      id: "leads",
      title: "Lead & Enquiry Management",
      icon: "icon-target.svg",
      tone: "pink",
    },
    {
      id: "visits",
      title: "Site Visits & Bookings",
      icon: "icon-calendar.svg",
      tone: "yellow",
    },
    {
      id: "inventory",
      title: "Inventory (Plots & Units)",
      icon: "icon-layers.svg",
      tone: "mint",
    },
    {
      id: "automation",
      title: "AI Automation & Follow-ups",
      icon: "icon-bot.svg",
      tone: "lavender",
    },
  ],
};

export const currentWorkFeatures: readonly CurrentWorkFeature[] = [
  {
    id: "category",
    title: "Real Estate SaaS",
    icon: "icon-building.svg",
    tone: "pink",
  },
  {
    id: "audience",
    title: currentWork.audience,
    icon: "icon-users.svg",
    tone: "mint",
  },
  {
    id: "ai",
    title: "AI Automation & Insights",
    detail: "Planned capabilities",
    icon: "icon-sparkles.svg",
    tone: "lavender",
  },
  {
    id: "markets",
    title: currentWork.targetMarkets.join(" & "),
    detail: "Target pilot markets",
    icon: "icon-map-pin.svg",
    tone: "yellow",
  },
];
