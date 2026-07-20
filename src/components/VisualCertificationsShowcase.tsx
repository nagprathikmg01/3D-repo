import { useState } from "react";
import { certifications } from "@/data/portfolio";

// Map certifications to rich categories & details
interface CredentialItem {
  issuer: string;
  title: string;
  category: "AI & LLM" | "Cloud & DevOps" | "Full-Stack & DB" | "Networking";
  id: string;
}

const ALL_CREDENTIALS: CredentialItem[] = [
  // Google Cloud
  { issuer: "Google Cloud", title: "Google Cloud Engineering Certificate", category: "Cloud & DevOps", id: "GCP-ENG-01" },
  { issuer: "Google Cloud", title: "Prompt Design in Vertex AI", category: "AI & LLM", id: "GCP-AI-02" },
  { issuer: "Google Cloud", title: "Build Infrastructure with Terraform on GCP", category: "Cloud & DevOps", id: "GCP-TF-03" },
  { issuer: "Google Cloud", title: "Develop Your Google Cloud Network", category: "Cloud & DevOps", id: "GCP-NET-04" },
  { issuer: "Google Cloud", title: "Gemini Multimodality & Multimodal RAG", category: "AI & LLM", id: "GCP-GEM-05" },
  { issuer: "Google Cloud", title: "GenAI Apps with Gemini & Streamlit", category: "AI & LLM", id: "GCP-APP-06" },
  { issuer: "Google Cloud", title: "Implement Load Balancing on Compute Engine", category: "Cloud & DevOps", id: "GCP-LB-07" },
  { issuer: "Google Cloud", title: "Set Up an App Dev Environment on GCP", category: "Cloud & DevOps", id: "GCP-DEV-08" },
  // AWS
  { issuer: "AWS", title: "AWS Cloud Foundations Badge", category: "Cloud & DevOps", id: "AWS-FOUND-01" },
  { issuer: "AWS", title: "AWS Cloud Architecting Badge", category: "Cloud & DevOps", id: "AWS-ARCH-02" },
  // Cisco
  { issuer: "Cisco", title: "Cisco Networking Basics", category: "Networking", id: "CISCO-NET-01" },
  // Simplilearn
  { issuer: "Simplilearn", title: "JFSD: Back-end & Database Development", category: "Full-Stack & DB", id: "SIMPLI-FS-01" },
  { issuer: "Simplilearn", title: "JFSD: Data Structures & Algorithms", category: "Full-Stack & DB", id: "SIMPLI-DSA-02" },
  { issuer: "Simplilearn", title: "JFSD: Planning & Designing UI", category: "Full-Stack & DB", id: "SIMPLI-UI-03" },
  // Infosys
  { issuer: "Infosys", title: "Infosys Springboard: Database and SQL", category: "Full-Stack & DB", id: "INFY-SQL-01" },
];

export default function VisualCertificationsShowcase() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const filteredCredentials = ALL_CREDENTIALS.filter((c) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "GCP") return c.issuer === "Google Cloud";
    if (activeTab === "AWS") return c.issuer === "AWS";
    if (activeTab === "AI") return c.category === "AI & LLM";
    if (activeTab === "DEV") return c.category === "Cloud & DevOps" || c.category === "Full-Stack & DB";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="fade-in flex flex-wrap items-center justify-between gap-4 border-b border-paperBorder pb-5">
        <div>
          <h3 className="font-display text-2xl font-bold text-inkDark">Industry Certifications & Accredited Badges</h3>
          <p className="font-mono text-xs text-inkMuted mt-1">
            15+ Independently Verified Credentials across Google Cloud, AWS, AI & Software Systems
          </p>
        </div>
        <div className="flex gap-2 font-mono text-xs">
          <span className="bg-paperSheet border border-paperBorder px-3.5 py-1.5 font-bold text-crimson">
            TOTAL BADGES: 15+
          </span>
          <span className="bg-paperSheet border border-paperBorder px-3.5 py-1.5 font-bold text-inkDark">
            AUDITED ✓
          </span>
        </div>
      </div>

      {/* Brand & Filter Switcher Tabs */}
      <div className="fade-in flex flex-wrap gap-2 font-mono text-xs border-b border-paperBorder/60 pb-4">
        {[
          { id: "ALL", label: "ALL CREDENTIALS (15)" },
          { id: "GCP", label: "GOOGLE CLOUD (8)" },
          { id: "AWS", label: "AWS (2)" },
          { id: "AI", label: "AI & LLM BADGES (4)" },
          { id: "DEV", label: "CLOUD & FULL-STACK (9)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 border transition-all ${
              activeTab === tab.id
                ? "bg-crimson text-white border-crimson font-bold shadow-sm"
                : "bg-paperSheet text-inkDark border-paperBorder hover:border-crimson hover:text-crimson"
            }`}
          >
            [ {tab.label} ]
          </button>
        ))}
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCredentials.map((c) => (
          <div
            key={c.id}
            className="fade-in space-panel p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group hover:border-crimson/60"
          >
            <div>
              <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-3">
                <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                  {c.issuer}
                </span>
                <span className="font-mono text-[9px] text-inkMuted bg-paperSheet border border-paperBorder px-2 py-0.5 font-semibold">
                  {c.category}
                </span>
              </div>

              <h4 className="font-display font-bold text-base text-inkDark group-hover:text-crimson transition-colors leading-snug mb-3">
                {c.title}
              </h4>
            </div>

            <div className="pt-3 border-t border-paperBorder/60 flex items-center justify-between font-mono text-[9px] text-inkMuted">
              <span>ID: {c.id}</span>
              <span className="text-crimson font-bold flex items-center gap-1">
                <span>VERIFIED</span>
                <span>✓</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
