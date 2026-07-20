/**
 * Single source of truth for all portfolio content.
 * The 3D scene and the mobile fallback both read from here.
 */

export const identity = {
  name: "NAG PRATHIK M G",
  subtitle: "Full-Stack · AI/ML · Cloud Engineer",
  roles: [
    "Full-Stack Engineer",
    "AI/ML Engineer",
    "Cloud & DevOps",
    "Google Student Ambassador",
  ],
  email: "nagprathikmg@gmail.com",
  phone: "+91-88926-86763",
  linkedin: "https://www.linkedin.com/in/nagprathikmg01",
  github: "https://github.com/nagprathikmg01",
  portfolio: "https://nagprathik.dev",
  resume: "/resume.pdf",
  photo: "/profile.jpg",
};

export const stats = [
  { label: "Google Ambassador", value: 250, prefix: "Top ", suffix: "" },
  { label: "CGPA", value: 8.5, prefix: "", suffix: "/10" },
  { label: "Certifications", value: 15, prefix: "", suffix: "+" },
  { label: "Event Participants", value: 200, prefix: "", suffix: "+" },
];

export type SkillTier = "ai" | "fs" | "cloud";

export interface Skill {
  name: string;
  tier: SkillTier;
}

export const skills: Skill[] = [
  // AI — largest, bright red glow
  { name: "PyTorch", tier: "ai" },
  { name: "Transformers", tier: "ai" },
  { name: "LLMs", tier: "ai" },
  { name: "RAG", tier: "ai" },
  { name: "Agentic AI", tier: "ai" },
  { name: "NLP", tier: "ai" },
  { name: "Gemini API", tier: "ai" },
  { name: "Vertex AI", tier: "ai" },
  { name: "Prompt Eng", tier: "ai" },
  { name: "Streamlit", tier: "ai" },
  { name: "Generative AI", tier: "ai" },
  { name: "NVIDIA NIM", tier: "ai" },
  // Full-stack — medium, dim red
  { name: "React.js", tier: "fs" },
  { name: "Flutter", tier: "fs" },
  { name: "Node.js", tier: "fs" },
  { name: "Express.js", tier: "fs" },
  { name: "Vite", tier: "fs" },
  { name: "TypeScript", tier: "fs" },
  { name: "Tailwind CSS", tier: "fs" },
  { name: "REST APIs", tier: "fs" },
  { name: "Prisma", tier: "fs" },
  { name: "Dart", tier: "fs" },
  // Cloud — smaller, dark red
  { name: "GCP", tier: "cloud" },
  { name: "AWS", tier: "cloud" },
  { name: "Terraform", tier: "cloud" },
  { name: "Firebase", tier: "cloud" },
  { name: "Docker", tier: "cloud" },
  { name: "Vercel", tier: "cloud" },
  { name: "CI/CD", tier: "cloud" },
  { name: "PostgreSQL", tier: "cloud" },
  { name: "MongoDB", tier: "cloud" },
  { name: "Redis", tier: "cloud" },
  { name: "MySQL", tier: "cloud" },
  { name: "Firestore", tier: "cloud" },
];

export interface Project {
  id: string;
  title: string;
  label: string;
  sub: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  badge?: string;
  stat?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "geoquest",
    title: "GeoQuest — AI-Driven Travel Planner",
    label: "GEOQUEST",
    sub: "LLM · Full-Stack · 39 Jest Tests",
    description:
      "LLM-powered itinerary engine on NVIDIA NIM (Claude 3.5 + Llama 3.1) with a full REST API backend — Express, Prisma, PostgreSQL, Redis caching — verified by 39 Jest tests.",
    tech: ["Claude 3.5", "Llama 3.1", "NVIDIA NIM", "Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com/nagprathikmg01/GeoQuest",
    image: "/assets/geoquest.png",
  },
  {
    id: "drone",
    title: "Adaptive Drone Navigation & Drift Detection",
    label: "DRONE NAV",
    sub: "Transformers · Online Learning",
    description:
      "Transformer-architecture navigation model achieving 92% drift-forecast accuracy with online learning for autonomous sensor recalibration. Tested in AirSim with a live Streamlit analytics dashboard.",
    tech: ["Python", "PyTorch", "Transformers", "Streamlit", "AirSim"],
    github: "https://github.com/nagprathikmg01",
    badge: "FINAL YEAR",
    stat: "92% Accuracy",
    image: "/assets/drone.png",
  },
  {
    id: "greencart",
    title: "GreenCart — Agentic AI Sustainable Shopping",
    label: "GREENCART",
    sub: "RAG · 3 Autonomous Agents",
    description:
      "Custom RAG pipeline with NLP intent parsing driving 3 autonomous agents (Analyzer, Search, Education) that surface real-time carbon-footprint metrics and eco-alternatives. Live on Vercel.",
    tech: ["React", "RAG", "Agentic AI", "NLP", "Vercel"],
    github: "https://github.com/nagprathikmg01/GreenCart",
    live: "https://green-cart-blush-xi.vercel.app",
    badge: "LIVE",
    image: "/assets/greencart.png",
  },
  {
    id: "clubos",
    title: "ClubOS — Cross-Platform Club Management",
    label: "CLUBOS",
    sub: "5 Platforms · 10+ Modules",
    description:
      "Production app for Android, iOS, Web, Windows & Linux with 10+ modules: Kanban boards, budget tracking, vault inventory, real-time chat, analytics, and automated PDF certificate generation.",
    tech: ["Flutter", "Dart", "Firebase", "Firestore"],
    github: "https://github.com/nagprathikmg01/Club-OS",
    stat: "5 Platforms",
    image: "/assets/clubos.png",
  },
];

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export const experience: Experience[] = [
  {
    role: "AI Sustainability Intern",
    company: "1M1B – AICTE – IBM SkillsBuild",
    duration: "Dec 2025 – Jan 2026",
    description:
      "Applied IBM Granite LLMs, Agentic AI, and RAG to UN SDG challenges. Co-certified by AICTE & IBM SkillsBuild.",
  },
  {
    role: "Google Student Ambassador — Top 250 Globally",
    company: "Google Developers",
    duration: "Jul 2025 – Present",
    description:
      "Conducted 5+ workshops on GCP & GenAI for 100+ students. Co-organised 2 hackathons with Google.",
  },
  {
    role: "Marketing Head",
    company: "IEEE Computer Society Student Chapter – NMIT",
    duration: "Jan 2026 – Present",
    description:
      "Leading branding, marketing outreach, and event visibility campaigns for technical conferences and code challenges.",
  },
  {
    role: "Head of Events & PR Lead",
    company: "Team Adwaitha | DataWiz | CloudZilla NMIT",
    duration: "Dec 2024 – Present",
    description: "Organized 6+ technical events with 200+ participants each.",
  },
];

export interface Education {
  school: string;
  detail: string;
  years: string;
}

export const education: Education[] = [
  { school: "NMIT Bengaluru", detail: "B.E. Information Science · CGPA 8.5/10", years: "2023 – 2027" },
  { school: "Ambika PU College", detail: "Pre-University · 94%", years: "2021 – 2023" },
  { school: "St. Joseph High School", detail: "SSLC · 96.8%", years: "2020 – 2021" },
];

export interface CertGroup {
  issuer: string;
  count: number;
  items: string[];
}

export const certifications: CertGroup[] = [
  {
    issuer: "Google Cloud",
    count: 8,
    items: [
      "Google Cloud Engineering Certificate",
      "Prompt Design in Vertex AI",
      "Build Infrastructure with Terraform on GCP",
      "Develop Your Google Cloud Network",
      "Gemini Multimodality & Multimodal RAG",
      "GenAI Apps with Gemini & Streamlit",
      "Implement Load Balancing on Compute Engine",
      "Set Up an App Dev Environment on GCP",
    ],
  },
  {
    issuer: "AWS",
    count: 2,
    items: ["AWS Cloud Foundations Badge", "AWS Cloud Architecting Badge"],
  },
  { issuer: "Cisco", count: 1, items: ["Cisco Networking Basics"] },
  {
    issuer: "Simplilearn",
    count: 3,
    items: [
      "JFSD: Back-end & Database Development",
      "JFSD: Data Structures & Algorithms",
      "JFSD: Planning & Designing UI",
    ],
  },
  { issuer: "Infosys", count: 1, items: ["Infosys Springboard: Database and SQL"] },
];

/** Z positions of each station along the flight path. */
export const SECTIONS = [
  { id: "name", label: "NAME", z: 0 },
  { id: "stats", label: "STATS", z: -20 },
  { id: "skills", label: "SKILLS", z: -40 },
  { id: "projects", label: "PROJECTS", z: -70 },
  { id: "experience", label: "EXP", z: -100 },
  { id: "education", label: "EDU", z: -130 },
  { id: "contact", label: "CONTACT", z: -160 },
] as const;

/** Camera starts here; SCROLL_PER_UNIT px of scroll = 1 unit forward on Z. */
export const CAMERA_START_Z = 12;
export const CAMERA_END_Z = -166;
export const SCROLL_PER_UNIT = 60; // px per world unit (~10.7k px total journey)
export const TOTAL_SCROLL = (CAMERA_START_Z - CAMERA_END_Z) * SCROLL_PER_UNIT;
/** Camera parks this many units in front of a station when flying to it. */
export const VIEW_OFFSET = 12;

export const colors = {
  bg: "#010101",
  primary: "#dc2626",
  bright: "#ef4444",
  dark: "#7f1d1d",
  glow: "rgba(220,38,38,0.4)",
  text: "#f5f5f5",
  muted: "#52525b",
} as const;
