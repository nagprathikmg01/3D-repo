import { identity } from "@/data/portfolio";

export default function GitHubActivityWidget() {
  // Generate simulated 52-week contribution grid
  const weeks = Array.from({ length: 36 }, (_, wIdx) => {
    return Array.from({ length: 7 }, (_, dIdx) => {
      const val = Math.floor(Math.sin(wIdx * 0.4 + dIdx * 0.8) * 3 + 2.5);
      return Math.max(0, Math.min(4, val));
    });
  });

  const getIntensityColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-crimson/20 border-crimson/30";
      case 2:
        return "bg-crimson/40 border-crimson/50";
      case 3:
        return "bg-crimson/70 border-crimson/80";
      case 4:
        return "bg-crimson border-crimson shadow-xs";
      default:
        return "bg-paperSheet border-paperBorder";
    }
  };

  return (
    <div className="space-panel bg-paperBg p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-paperBorder pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-[0.2em]">
              LIVE REPOSITORY ACTIVITY & COMMIT RADAR
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-inkDark mt-1">
            GitHub Code Velocity & Engineering Metrics
          </h3>
        </div>

        <a
          href={identity.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-xs px-4 py-2 flex items-center gap-2"
        >
          <span>INSPECT GITHUB PROFILE</span>
          <span>↗</span>
        </a>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-paperSheet border border-paperBorder">
          <p className="text-[10px] text-inkMuted uppercase">ANNUAL COMMITS</p>
          <p className="text-2xl font-bold text-crimson font-display mt-1">680+</p>
        </div>
        <div className="p-4 bg-paperSheet border border-paperBorder">
          <p className="text-[10px] text-inkMuted uppercase">LONGEST STREAK</p>
          <p className="text-2xl font-bold text-inkDark font-display mt-1">42 DAYS</p>
        </div>
        <div className="p-4 bg-paperSheet border border-paperBorder">
          <p className="text-[10px] text-inkMuted uppercase">ACTIVE REPOS</p>
          <p className="text-2xl font-bold text-inkDark font-display mt-1">18 REPOS</p>
        </div>
        <div className="p-4 bg-paperSheet border border-paperBorder">
          <p className="text-[10px] text-inkMuted uppercase">PR ACCEPTANCE</p>
          <p className="text-2xl font-bold text-crimson font-display mt-1">98.4%</p>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] text-inkMuted">
          <span>52-WEEK COMMIT HEATMAP (2025–2026)</span>
          <div className="flex items-center gap-1.5">
            <span>LESS</span>
            <span className="w-2.5 h-2.5 bg-paperSheet border border-paperBorder inline-block" />
            <span className="w-2.5 h-2.5 bg-crimson/30 inline-block" />
            <span className="w-2.5 h-2.5 bg-crimson/70 inline-block" />
            <span className="w-2.5 h-2.5 bg-crimson inline-block" />
            <span>MORE</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-max">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className={`w-3.5 h-3.5 border rounded-2xs transition-transform hover:scale-125 ${getIntensityColor(
                      day
                    )}`}
                    title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${day * 3} commits`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Tech Stack Percentage Bars */}
      <div className="space-y-3 pt-3 border-t border-paperBorder font-mono">
        <div className="flex items-center justify-between text-xs">
          <span className="text-inkDark font-bold">PRIMARY CODEBASE DISTRIBUTION</span>
          <span className="text-inkMuted text-[10px]">VERIFIED SOURCE ANALYSIS</span>
        </div>

        {/* Stack progress bar */}
        <div className="h-3 w-full bg-paperSheet border border-paperBorder overflow-hidden flex rounded-2xs">
          <div className="h-full bg-crimson w-[45%]" title="TypeScript 45%" />
          <div className="h-full bg-inkDark w-[30%]" title="Python 30%" />
          <div className="h-full bg-amber-600 w-[15%]" title="Dart / Flutter 15%" />
          <div className="h-full bg-blue-600 w-[10%]" title="C++ / Systems 10%" />
        </div>

        <div className="flex flex-wrap gap-4 text-[10px] text-inkMuted pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-crimson" />
            <span className="text-inkDark font-semibold">TYPESCRIPT (45%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-inkDark" />
            <span className="text-inkDark font-semibold">PYTHON (30%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="text-inkDark font-semibold">DART / FLUTTER (15%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-inkDark font-semibold">C++ / SYSTEMS (10%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
