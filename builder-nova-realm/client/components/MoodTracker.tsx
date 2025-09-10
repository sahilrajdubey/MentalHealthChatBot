import {
  HeartPulse,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Bell,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const emojis = [
  { v: 1, label: "Very bad", Icon: Angry },
  { v: 2, label: "Bad", Icon: Frown },
  { v: 3, label: "Okay", Icon: Meh },
  { v: 4, label: "Good", Icon: Smile },
  { v: 5, label: "Great", Icon: Laugh },
];

function keyForToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export default function MoodTracker() {
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("sahaara-mood");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(
    () => localStorage.setItem("sahaara-mood", JSON.stringify(ratings)),
    [ratings],
  );

  const today = keyForToday();
  const streak = useMemo(() => {
    // count consecutive days with rating <=2 (negative)
    let cnt = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = d.toISOString().slice(0, 10);
      const r = ratings[k];
      if (r && r <= 2) cnt++;
      else break;
    }
    return cnt;
  }, [ratings]);

  useEffect(() => {
    if (streak >= 3) {
      toast.message("We noticed a tough streak", {
        description:
          "Would you like some tips or to book a confidential session?",
      });
    }
  }, [streak]);

  const setToday = (v: number) => setRatings((r) => ({ ...r, [today]: v }));

  return (
    <section id="mood" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <HeartPulse className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Mood Tracking</h2>
      </div>
      <div className="rounded-xl border bg-card p-4 md:p-6">
        <p className="text-sm text-muted-foreground">
          How are you feeling today? One-tap check-in.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {emojis.map(({ v, label, Icon }) => (
            <button
              key={v}
              onClick={() => setToday(v)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${ratings[today] === v ? "bg-primary text-primary-foreground border-transparent" : "bg-background"}`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Negative streak: {streak} day(s)
        </div>
      </div>
    </section>
  );
}
