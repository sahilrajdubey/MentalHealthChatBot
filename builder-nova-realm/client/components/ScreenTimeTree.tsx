import { Timer } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function dateKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function useActiveSeconds() {
  const [secs, setSecs] = useState<number>(0);
  const lastActivity = useRef<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sahaara-usage:" + dateKey());
    if (saved) setSecs(parseInt(saved));
  }, []);

  useEffect(() => {
    const onActivity = () => {
      lastActivity.current = Date.now();
    };
    const tick = () => {
      const idle = Date.now() - lastActivity.current > 60000; // 60s idle threshold
      const hidden = document.hidden;
      if (!idle && !hidden) {
        setSecs((s) => {
          const ns = s + 1;
          localStorage.setItem("sahaara-usage:" + dateKey(), String(ns));
          return ns;
        });
      }
      // handle day rollover
      const key = dateKey();
      if (!localStorage.getItem("sahaara-usage:" + key)) {
        localStorage.setItem("sahaara-usage:" + key, "0");
      }
    };
    const id = window.setInterval(tick, 1000);
    intervalRef.current = id;
    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("touchstart", onActivity);
    document.addEventListener("visibilitychange", onActivity);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
      document.removeEventListener("visibilitychange", onActivity);
    };
  }, []);

  return secs;
}

function getUsageHistory(days = 7) {
  const arr: { key: string; secs: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const k = dateKey(d);
    const v = parseInt(localStorage.getItem("sahaara-usage:" + k) || "0");
    arr.push({ key: k, secs: v });
  }
  return arr;
}

function secondsToHMS(s: number) {
  const h = Math.floor(s / 3600);
  s %= 3600;
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${h}h ${m}m ${ss}s`;
}

export default function ScreenTimeTree() {
  const secs = useActiveSeconds();
  const [history, setHistory] = useState(() => getUsageHistory(8));

  useEffect(() => {
    const id = window.setInterval(() => setHistory(getUsageHistory(8)), 5000);
    return () => window.clearInterval(id);
  }, []);

  const today = history[history.length - 1]?.secs || 0;
  const yesterday = history[history.length - 2]?.secs || 0;

  const reductionStreak = useMemo(() => {
    let cnt = 0;
    for (let i = history.length - 1; i > 0; i--) {
      if (history[i].secs < history[i - 1].secs) cnt++;
      else break;
    }
    return cnt;
  }, [history]);

  const stage = Math.min(6, reductionStreak); // 0..6 growth stages

  return (
    <section id="screentime" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Screen Time & Growth Tree</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 md:p-6">
          <div className="mb-2 text-sm text-muted-foreground">
            Active time is measured while this tab is visible and you are
            active.
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm">
              <div>
                Today: <span className="font-mono">{secondsToHMS(today)}</span>
              </div>
              <div className="text-muted-foreground">
                Yesterday:{" "}
                <span className="font-mono">{secondsToHMS(yesterday)}</span>
              </div>
              <div className="mt-2 text-xs">
                Daily goal: use less than yesterday to grow the tree.
              </div>
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-2 bg-primary"
              style={{
                width: `${Math.min(100, (today / (yesterday || 1)) * 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 md:p-6">
          <div className="mb-3 text-sm text-muted-foreground">
            Growth stage: {stage} (consecutive better days)
          </div>
          <TreeSVG stage={stage} />
        </div>
      </div>
    </section>
  );
}

function TreeSVG({ stage }: { stage: number }) {
  const height = 220;
  const width = 280;
  const trunkHeight = 60 + stage * 10;
  const crownRadius = 20 + stage * 10;
  const leaves = Array.from({ length: 12 + stage * 6 }, (_, i) => i);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto block w-full max-w-sm"
    >
      <defs>
        <linearGradient id="leaf" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
          <stop
            offset="100%"
            stopColor="hsl(var(--accent))"
            stopOpacity="0.9"
          />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill="transparent" />
      <rect
        x={width / 2 - 8}
        y={height - trunkHeight - 20}
        width="16"
        height={trunkHeight}
        rx="4"
        fill="#8B5A2B"
      />
      <circle
        cx={width / 2}
        cy={height - trunkHeight - 40}
        r={crownRadius}
        fill="url(#leaf)"
      />
      {leaves.map((i) => {
        const angle = (i / leaves.length) * Math.PI * 2;
        const r = crownRadius - 5 - (i % 5);
        const cx = width / 2 + Math.cos(angle) * r;
        const cy = height - trunkHeight - 40 + Math.sin(angle) * r;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={2}
            fill="hsl(var(--primary))"
            opacity={0.9}
          />
        );
      })}
      <rect
        x="0"
        y={height - 14}
        width={width}
        height="14"
        fill="#166534"
        opacity="0.2"
      />
    </svg>
  );
}
