import { useState, useRef, useEffect } from "react";
import { identity, skills, projects } from "@/data/portfolio";

interface HistoryItem {
  command: string;
  output: string | JSX.Element;
}

export default function TerminalCLIWidget() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-crimson font-bold">NPMG DISSERTATION CLI v2026.1 ONLINE</p>
          <p className="text-inkMuted text-[10px]">Type <span className="text-inkDark font-bold">help</span> to list available commands or click quick actions below.</p>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let output: string | JSX.Element = "";

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1 text-inkMuted">
            <p className="text-crimson font-bold">AVAILABLE TRANSMISSION COMMANDS:</p>
            <p><span className="text-inkDark font-bold">skills</span> — Display technical competencies breakdown</p>
            <p><span className="text-inkDark font-bold">projects</span> — List published software & AI research</p>
            <p><span className="text-inkDark font-bold">contact</span> — Display electronic mail & phone channels</p>
            <p><span className="text-inkDark font-bold">ambassador</span> — Google Student Ambassador details</p>
            <p><span className="text-inkDark font-bold">clear</span> — Flush terminal output buffer</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-1">
            <p className="text-crimson font-bold">TOP TECHNICAL COMPETENCIES:</p>
            <p className="text-inkMuted">AI/ML: PyTorch, Transformers, LLMs, RAG, Agentic AI, NVIDIA NIM</p>
            <p className="text-inkMuted">FULL-STACK: React.js, Node.js, TypeScript, Flutter, Prisma</p>
            <p className="text-inkMuted">CLOUD: GCP, AWS, Docker, Terraform, PostgreSQL, Redis</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1">
            <p className="text-crimson font-bold">PUBLISHED MANUSCRIPTS & PROJECTS:</p>
            {projects.map((p) => (
              <p key={p.id} className="text-inkMuted">
                ▸ <span className="text-inkDark font-bold">{p.title}</span> ({p.sub})
              </p>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-inkMuted">
            <p className="text-crimson font-bold">DIRECT COMMUNICATIONS:</p>
            <p>Email: <a href={`mailto:${identity.email}`} className="text-inkDark underline">{identity.email}</a></p>
            <p>Phone: {identity.phone}</p>
            <p>Location: Bengaluru, India</p>
          </div>
        );
        break;

      case "ambassador":
        output = (
          <p className="text-inkMuted">
            <span className="text-crimson font-bold">GOOGLE STUDENT AMBASSADOR:</span> Selected among Top 250 globally. Conducted 5+ workshops on GCP & GenAI for 100+ students. Co-organized 2 hackathons with Google.
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = `Command not recognized: "${trimmed}". Type "help" for valid commands.`;
    }

    setHistory((prev) => [...prev, { command: cmdStr, output }]);
    setInput("");
  };

  return (
    <div className="space-panel p-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-paperBorder pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
          <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
            [ INTERACTIVE DISSERTATION TERMINAL ]
          </span>
        </div>
        <span className="font-mono text-[9px] text-inkMuted">CLI v2026.1</span>
      </div>

      {/* Quick Action Chips */}
      <div className="flex flex-wrap gap-1.5 font-mono text-[10px] mb-4">
        {["help", "skills", "projects", "ambassador", "contact", "clear"].map((c) => (
          <button
            key={c}
            onClick={() => handleCommand(c)}
            className="px-2.5 py-1 bg-paperSheet border border-paperBorder text-inkDark hover:border-crimson hover:text-crimson transition-colors"
          >
            &gt; {c}
          </button>
        ))}
      </div>

      {/* Terminal Viewport */}
      <div className="bg-[#151413] border border-paperBorder rounded-sm p-4 h-52 overflow-y-auto font-mono text-xs text-[#E0DDD9] space-y-3">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <p className="text-crimson">
              <span className="text-[#8C8A84]">nmpg@dissertation:~$</span> {h.command}
            </p>
            <div className="text-xs pl-2 border-l border-[#2A2826]">{h.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
        }}
        className="mt-3 flex gap-2 font-mono text-xs"
      >
        <span className="text-crimson py-2 font-bold">&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' or any command..."
          className="flex-1 bg-paperSheet border border-paperBorder px-3 py-2 text-inkDark placeholder-inkMuted/60 focus:border-crimson focus:outline-none"
        />
        <button type="submit" className="btn-red text-[10px] px-4">
          EXECUTE
        </button>
      </form>
    </div>
  );
}
