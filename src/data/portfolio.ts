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
  overviewDetails: string[];
  tech: string[];
  github: string;
  live?: string;
  badge?: string;
  stat?: string;
  image?: string;
  repoName: string;
  architecture: string;
  highlights: string[];
  metrics: string[];
}

export const projects: Project[] = [
  {
    id: "geoquest",
    title: "GeoQuest — AI-Driven Travel Planner",
    label: "GEOQUEST",
    sub: "LLM · Full-Stack · 39 Jest Tests",
    repoName: "nagprathikmg01/GeoQuest",
    description:
      "GeoQuest is a production-grade AI itinerary generator and smart travel engine powered by NVIDIA NIM endpoints (Claude 3.5 & Llama 3.1). Built with a robust Express backend, PostgreSQL, Prisma ORM, and high-performance Redis caching, it transforms user preferences into optimized multi-day travel plans.",
    overviewDetails: [
      "GeoQuest eliminates manual trip planning by using advanced Large Language Models to automatically curate day-by-day itineraries based on traveler preferences, budget constraints, and geographical proximity.",
      "The system utilizes a dual-model LLM strategy over NVIDIA NIM microservices: Claude 3.5 Sonnet for natural language intent understanding and Llama 3.1 70B for location constraint evaluation.",
      "To optimize API latency and reduce LLM token expenses by up to 65%, GeoQuest implements a sub-10ms Redis caching layer that stores location embeddings and frequent route patterns.",
      "The application features a production REST API backend built on Node.js/Express, type-safe database queries via Prisma ORM to PostgreSQL, and is fully validated by 39 automated Jest unit and integration test suites.",
    ],
    architecture:
      "Multi-layer architecture featuring an Express.js API gateway, Prisma ORM data layer with PostgreSQL, Redis sub-10ms cache invalidation, and NVIDIA NIM hosted Claude 3.5 / Llama 3.1 LLM endpoints.",
    highlights: [
      "AI-driven route optimization algorithm calculating multi-day destination itineraries.",
      "Sub-10ms Redis caching layer reducing API token consumption by 65%.",
      "Prisma ORM data schema mapping points of interest, budget categories, and day plans.",
      "Comprehensive test suite backed by 39 automated Jest integration unit tests.",
    ],
    metrics: ["39 Jest Tests Passed", "Sub-10ms Redis Cache Hits", "65% Token Overhead Reduction"],
    tech: ["Claude 3.5", "Llama 3.1", "NVIDIA NIM", "Node.js", "Express", "Prisma", "PostgreSQL", "Redis"],
    github: "https://github.com/nagprathikmg01/GeoQuest",
    image: "/assets/geoquest.png",
  },
  {
    id: "drone",
    title: "Adaptive Drone Navigation & Drift Detection",
    label: "DRONE NAV",
    sub: "Transformers · Online Learning",
    repoName: "nagprathikmg01/DroneNavStream",
    description:
      "Autonomous quadrotor flight telemetry system featuring a custom PyTorch Transformer encoder for 3D trajectory drift forecasting. Includes an online learning feedback loop for dynamic sensor recalibration and a real-time 3D Streamlit analytics dashboard.",
    overviewDetails: [
      "Autonomous drones frequently suffer from sensor bias, wind drift, and IMU degradation during long-range flights. Drone NavStream addresses this by predicting spatial trajectory deltas before position errors compound.",
      "The core model processes a continuous 12-dimensional IMU sensor telemetry sequence (acceleration, angular velocity, orientation, altitude) through a 4-layer, 8-head Transformer Encoder.",
      "Achieved 92% trajectory drift forecasting accuracy in high-fidelity Microsoft AirSim simulation environments under harsh environmental perturbations.",
      "Features an online continuous learning loop that dynamically adjusts accelerometer and gyroscope calibration offset vectors during flight, paired with an interactive 3D Streamlit telemetry dashboard.",
    ],
    architecture:
      "Deep Learning spatial pipeline using PyTorch Transformer Encoders (12-dim IMU input sequence, 4 layers, 8 heads) predicting 3D drift deltas (x, y, z) with real-time AirSim hardware telemetry integration.",
    highlights: [
      "Custom 4-layer 8-head PyTorch Transformer encoder forecasting IMU trajectory drift deltas.",
      "Achieved 92% drift forecast accuracy under simulated wind & sensor bias perturbations.",
      "Online continuous learning loop for dynamic sensor recalibration during flight.",
      "Interactive 3D Streamlit telemetry dashboard visualizing planned vs actual flight paths.",
    ],
    metrics: ["92% Drift Forecast Accuracy", "12-Dim Sensor Telemetry Input", "Real-Time AirSim Simulation"],
    tech: ["Python", "PyTorch", "Transformers", "Streamlit", "AirSim", "NumPy", "SciPy"],
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
    repoName: "nagprathikmg01/GreenCart",
    description:
      "GreenCart is an agentic e-commerce platform that empowers shoppers to make eco-friendly choices. Powered by 3 specialized AI agents (Carbon Analyzer, Search Agent, Sustainability Educator), it calculates product carbon footprints in real time and suggests certified green alternatives.",
    overviewDetails: [
      "E-commerce platforms lack transparency regarding product environmental impact. GreenCart solves this by integrating RAG semantic search and autonomous agents directly into the shopping workflow.",
      "The system orchestrates 3 autonomous agents: Agent Alpha analyzes item lifecycle carbon emissions, Agent Beta queries sustainable supplier databases for eco-friendly alternatives, and Agent Gamma educates users on verifiable environmental certifications.",
      "Built with a sleek React frontend deployed live on Vercel, delivering sub-50ms carbon offset calculations and semantic product recommendations.",
      "Implements NLP query intent parsing to extract material compositions (e.g. recycled polyester vs virgin plastic) and surface eco-verified badges.",
    ],
    architecture:
      "Decoupled React frontend communicating with 3 autonomous agent orchestrators (Carbon Analyzer, Product Search, Sustainability Educator) utilizing vector context retrieval for product verification.",
    highlights: [
      "Multi-agent intent architecture classifying shopping queries and calculating eco-impact scores.",
      "Real-time carbon offset estimator recommending sustainable product alternatives.",
      "NLP semantic parsing identifying eco-certified suppliers and materials.",
      "Deployed on Vercel with high-speed edge API responses and responsive mobile UI.",
    ],
    metrics: ["3 Autonomous Agents", "Live Deployed on Vercel", "Sub-50ms Impact Calculation"],
    tech: ["React", "TypeScript", "RAG", "Agentic AI", "NLP", "Vercel", "Tailwind CSS"],
    github: "https://github.com/nagprathikmg01/GreenCart",
    live: "https://green-cart-blush-xi.vercel.app",
    badge: "LIVE",
    image: "/assets/greencart.png",
  },
  {
    id: "clubos",
    title: "ClubOS — Cross-Platform Club Management OS",
    label: "CLUBOS",
    sub: "5 Platforms · 10+ Modules",
    repoName: "nagprathikmg01/Club-OS",
    description:
      "ClubOS is an operating system designed to streamline university and organization club management. Built with Flutter for multi-platform delivery across Android, iOS, Web, Windows, and Linux, it features 10+ operational modules powered by Firebase real-time data sync.",
    overviewDetails: [
      "Managing student clubs and non-profit organizations often involves fragmented tools for task tracking, announcements, budget management, and certificate generation. ClubOS unifies all operations into a single native app.",
      "Built on a single Flutter/Dart codebase that compiles natively to 5 target platforms (Android, iOS, Web, Windows Desktop, Linux).",
      "Features 10+ production modules: interactive Kanban project boards, expense & budget trackers, equipment inventory vaults, real-time community chat channels, and automated PDF certificate rendering.",
      "Integrates Firebase Authentication for multi-role user access control (Admins, Event Leads, Members) and Firestore NoSQL for instant offline-first data synchronization.",
    ],
    architecture:
      "Cross-platform Flutter frontend with Dart single codebase architecture communicating with Firebase Authentication, Firestore real-time NoSQL database, and Cloud Storage for asset distribution.",
    highlights: [
      "Single Dart codebase compiling natively to Android, iOS, Web, Windows, and Linux.",
      "10+ integrated operational modules including Kanban task boards and vault inventory tracking.",
      "Real-time Firestore sync for club announcements and instant member notifications.",
      "Automated PDF certificate generation engine for workshop and hackathon attendees.",
    ],
    metrics: ["5 Platforms Native Support", "10+ Operational Modules", "Real-Time Firestore Sync"],
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "Firebase Auth", "PDF Engine"],
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
