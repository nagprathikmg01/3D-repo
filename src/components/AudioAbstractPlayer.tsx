import { useState, useEffect } from "react";
import { identity } from "@/data/portfolio";

export default function AudioAbstractPlayer() {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  const textToRead = `This dissertation presents empirical research and production software engineering across neural drift detection, autonomous agentic workflows, multi-platform applications, and resilient cloud architectures authored by ${identity.name}.`;

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
    }
  }, []);

  const toggleAudio = () => {
    if (!supported) return;

    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);

      window.speechSynthesis.speak(utterance);
      setPlaying(true);
    }
  };

  if (!supported) return null;

  return (
    <button
      onClick={toggleAudio}
      className={`btn-ghost text-[10px] px-3.5 py-1.5 flex items-center gap-2 transition-all ${
        playing ? "border-crimson text-crimson font-bold bg-paperSheet" : ""
      }`}
      title="Listen to Abstract Summary"
    >
      {playing ? (
        <>
          <span className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-full bg-crimson animate-pulse" />
            <span className="w-0.5 h-2/3 bg-crimson animate-bounce" />
            <span className="w-0.5 h-full bg-crimson animate-pulse" />
          </span>
          <span>PAUSE ABSTRACT AUDIO</span>
        </>
      ) : (
        <>
          <span>▶ LISTEN TO ABSTRACT [AUDIO]</span>
        </>
      )}
    </button>
  );
}
