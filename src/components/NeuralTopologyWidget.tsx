import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  layer: number;
  label: string;
  active: boolean;
  value: string;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export default function NeuralTopologyWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 280);

    // Build 4 layers of nodes
    const layerNames = ["INPUT TENSORS", "ATTENTION HEADS", "LATENT EMBEDDINGS", "INFERENCE OUTPUT"];
    const layerCounts = [4, 5, 4, 3];
    const nodes: Node[] = [];

    layerCounts.forEach((count, lIdx) => {
      const x = (width / (layerCounts.length + 1)) * (lIdx + 1);
      for (let i = 0; i < count; i++) {
        const y = (height / (count + 1)) * (i + 1);
        nodes.push({
          x,
          y,
          layer: lIdx,
          label: `${layerNames[lIdx]} #${i + 1}`,
          active: false,
          value: lIdx === 0 ? `Dim: 1x512` : lIdx === 1 ? `Heads: 8, Softmax` : lIdx === 2 ? `Z-Vector: 1024d` : `SLA: <45ms`,
        });
      }
    });

    // Create packets between adjacent layers
    const packets: Packet[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].layer === nodes[i].layer + 1 && Math.random() > 0.5) {
          packets.push({
            fromNode: i,
            toNode: j,
            progress: Math.random(),
            speed: 0.006 + Math.random() * 0.008,
          });
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections between adjacent layers
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = "rgba(224, 221, 217, 0.4)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and draw packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#9E4733";
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = n.active ? "#9E4733" : "#F4F2EE";
        ctx.strokeStyle = "#9E4733";
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse interaction for tooltip
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: Node | null = null;
      nodes.forEach((n) => {
        const dx = mx - n.x;
        const dy = my - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < 14) {
          n.active = true;
          found = n;
        } else {
          n.active = false;
        }
      });
      setHoveredNode(found);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="space-panel p-6 overflow-hidden relative">
      <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-4">
        <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
          [ FIG 1.2 — LIVE NEURAL PIPELINE TOPOLOGY ]
        </span>
        <span className="font-mono text-[9px] text-crimson bg-paperSheet border border-paperBorder px-2.5 py-1 flex items-center gap-1.5 font-bold">
          <span className="live-dot w-1.5 h-1.5 rounded-full" />
          ACTIVE INFERENCE
        </span>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-56 cursor-crosshair" />

        {hoveredNode && (
          <div className="absolute top-2 right-2 font-mono text-[10px] bg-paperBg border border-crimson p-3 shadow-md space-y-1 animate-fade-in">
            <p className="text-crimson font-bold uppercase">{hoveredNode.label}</p>
            <p className="text-inkDark">{hoveredNode.value}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 border-t border-paperBorder pt-3 font-mono text-[9px] text-inkMuted text-center">
        <div>1. INPUT PREPROCESSING</div>
        <div>2. TRANSFORMER HEADS</div>
        <div>3. LATENT EMBEDDINGS</div>
        <div>4. LOW-LATENCY OUTPUT</div>
      </div>
    </div>
  );
}
