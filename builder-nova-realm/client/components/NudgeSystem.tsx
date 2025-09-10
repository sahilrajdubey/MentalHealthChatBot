import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function hoursSince(ts: number) {
  return (Date.now() - ts) / 3600000;
}

export default function NudgeSystem() {
  const [enabled, setEnabled] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("sahaara-nudges") || "true"),
  );
  const lastBreak = useRef<number>(Date.now());

  useEffect(() => {
    localStorage.setItem("sahaara-nudges", JSON.stringify(enabled));
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      const h = new Date().getHours();
      // study stretch every 60 minutes of continuous time
      if (hoursSince(lastBreak.current) >= 1) {
        toast("Time for a stretch", {
          description:
            "You’ve been focused for an hour. Try 2 minutes of movement.",
        });
        lastBreak.current = Date.now();
      }
      // seasonal nudges
      const m = new Date().getMonth(); // 0-11
      if ([3, 4, 10, 11].includes(m) && h >= 18 && h <= 21) {
        toast.message("Exam-time nudge", {
          description: "Short breaks improve memory. You got this!",
        });
      }
    }, 60_000);
    return () => window.clearInterval(id);
  }, [enabled]);

  return null;
}
