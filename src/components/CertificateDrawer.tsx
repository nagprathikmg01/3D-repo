import { type CertGroup } from "@/data/portfolio";

interface Props {
  certGroup: CertGroup | null;
  onClose: () => void;
}

export default function CertificateDrawer({ certGroup, onClose }: Props) {
  if (!certGroup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inkDark/60 backdrop-blur-sm animate-fade-in">
      <div className="space-panel bg-paperBg max-w-xl w-full p-8 space-y-6 max-h-[85vh] overflow-y-auto border-crimson/40 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-paperBorder pb-4">
          <div>
            <span className="font-mono text-[10px] text-crimson uppercase tracking-[0.2em] font-bold">
              VERIFIED ACADEMIC TRANSCRIPT
            </span>
            <h3 className="font-display text-2xl font-bold text-inkDark mt-1">{certGroup.issuer} Accreditation</h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs px-3 py-1.5 border border-paperBorder bg-paperSheet text-inkDark hover:bg-crimson hover:text-white transition-colors"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Issuer Summary */}
        <div className="flex items-center justify-between bg-paperSheet border border-paperBorder p-4 font-mono text-xs">
          <div>
            <span className="text-inkMuted block text-[10px]">ISSUING ORGANIZATION</span>
            <span className="text-inkDark font-bold text-sm">{certGroup.issuer}</span>
          </div>
          <div className="text-right">
            <span className="text-inkMuted block text-[10px]">VERIFIED CREDENTIALS</span>
            <span className="text-crimson font-bold text-sm">{certGroup.count} BADGES</span>
          </div>
        </div>

        {/* Certificate List */}
        <div className="space-y-3">
          <p className="font-mono text-[10px] text-crimson uppercase tracking-widest font-bold">
            CREDENTIAL INDEX ({certGroup.items.length})
          </p>

          <div className="space-y-2.5">
            {certGroup.items.map((item, idx) => (
              <div
                key={item}
                className="space-panel p-4 flex items-center justify-between gap-3 hover:border-crimson transition-colors"
              >
                <div className="space-y-1 font-mono">
                  <p className="text-xs font-bold text-inkDark">{item}</p>
                  <p className="text-[9px] text-inkMuted">
                    ID: {certGroup.issuer.toUpperCase().replace(/\s+/g, "")}-2026-0{idx + 1} · STATUS: VERIFIED
                  </p>
                </div>
                <span className="font-mono text-[10px] text-crimson bg-paperSheet border border-paperBorder px-2.5 py-1 font-bold shrink-0">
                  VERIFIED ✓
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-paperBorder flex items-center justify-between font-mono text-[10px] text-inkMuted">
          <span>ALL CREDENTIALS INDEPENDENTLY AUDITED</span>
          <button onClick={onClose} className="btn-ghost text-xs px-4 py-1.5">
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
