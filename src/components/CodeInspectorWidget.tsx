import { useState } from "react";

interface Snippet {
  id: string;
  title: string;
  language: string;
  project: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: "pytorch-drone",
    title: "DriftPredictor.py",
    language: "python",
    project: "Adaptive Drone Navigation",
    code: `import torch
import torch.nn as nn

class DroneDriftTransformer(nn.Module):
    """
    Transformer architecture for autonomous quadrotor drift forecasting.
    Achieves 92% trajectory accuracy on AirSim hardware telemetry.
    """
    def __init__(self, input_dim=12, d_model=256, nhead=8, num_layers=4):
        super().__init__()
        self.embedding = nn.Linear(input_dim, d_model)
        encoder_layer = nn.TransformerEncoderLayer(d_model=d_model, nhead=nhead, batch_first=True)
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.drift_head = nn.Linear(d_model, 3) # Forecast delta (x, y, z)

    def forward(self, x):
        # x shape: [batch_size, sequence_len, input_dim]
        tokens = self.embedding(x)
        features = self.transformer(tokens)
        drift_delta = self.drift_head(features[:, -1, :])
        return drift_delta`,
  },
  {
    id: "rag-agent",
    title: "MultiAgentOrchestrator.ts",
    language: "typescript",
    project: "GreenCart Agentic AI",
    code: `import { ChatNvidiaNIM } from "@langchain/nvidia-nim";
import { VectorStoreRetriever } from "@/lib/vector";

export async function orchestrateGreenCartAgents(userQuery: string) {
  // Agent 1: Intent & Carbon Footprint Parser
  const intentModel = new ChatNvidiaNIM({ model: "meta/llama-3.1-70b-instruct" });
  const intent = await intentModel.invoke([{ role: "user", content: userQuery }]);

  // Agent 2: RAG Context Retrieval for Eco-Alternatives
  const retriever = new VectorStoreRetriever({ collection: "sustainable_catalog" });
  const contextDocs = await retriever.getRelevantDocuments(userQuery);

  // Agent 3: Synthesis & Carbon Metrics Calculation
  return {
    query: userQuery,
    intent: intent.content,
    retrievedProducts: contextDocs.map(doc => doc.metadata),
    timestamp: new Date().toISOString(),
  };
}`,
  },
  {
    id: "geoquest-api",
    title: "ItineraryEngine.ts",
    language: "typescript",
    project: "GeoQuest Travel Planner",
    code: `import { Redis } from "ioredis";
import { PrismaClient } from "@prisma/client";

const redis = new Redis(process.env.REDIS_URL);
const prisma = new PrismaClient();

export async function getCachedItinerary(destinationId: string, durationDays: number) {
  const cacheKey = \`itinerary:\${destinationId}:\${durationDays}\`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached); // Fast sub-10ms cache hit
  }

  const result = await prisma.itinerary.findFirst({
    where: { destinationId, durationDays },
    include: { pointsOfInterest: true, routes: true }
  });

  await redis.setex(cacheKey, 3600, JSON.stringify(result));
  return result;
}`,
  },
];

export default function CodeInspectorWidget() {
  const [activeId, setActiveId] = useState(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeId) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-panel p-6 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paperBorder pb-4 mb-4">
        <div>
          <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold block">
            [ MANUSCRIPT CODE INSPECTOR ]
          </span>
          <h3 className="font-display text-xl font-bold text-inkDark">Production Engineering Artifacts</h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {SNIPPETS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`px-3 py-1.5 border transition-all ${
                s.id === activeId
                  ? "bg-crimson text-white border-crimson font-bold"
                  : "bg-paperSheet text-inkDark border-paperBorder hover:border-crimson"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Code Block Container */}
      <div className="bg-[#151413] border border-paperBorder rounded-sm p-4 text-xs font-mono relative overflow-x-auto">
        <div className="flex items-center justify-between text-[10px] text-[#8C8A84] border-b border-[#2A2826] pb-2 mb-3">
          <span>PROJECT: {activeSnippet.project.toUpperCase()}</span>
          <button
            onClick={handleCopy}
            className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[10px] bg-[#2A2826] px-2 py-0.5 rounded-sm"
          >
            {copied ? "COPIED ✓" : "COPY SNIPPET 📋"}
          </button>
        </div>

        <pre className="text-[#E0DDD9] leading-relaxed font-mono">
          <code>{activeSnippet.code}</code>
        </pre>
      </div>
    </div>
  );
}
