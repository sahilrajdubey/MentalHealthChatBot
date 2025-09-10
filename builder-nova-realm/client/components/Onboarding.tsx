import { KeyRound, LogIn, UserCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const adjectives = [
  "Calm",
  "Brave",
  "Kind",
  "Bright",
  "Wise",
  "Gentle",
  "Hopeful",
  "Strong",
  "Patient",
  "Noble",
];
const animals = [
  "Lotus",
  "Peacock",
  "Tiger",
  "River",
  "Banyan",
  "Deer",
  "Sparrow",
  "Sunbeam",
  "Moonlight",
  "Parrot",
];

function makePseudonym() {
  const a = adjectives[Math.floor(Math.random() * adjectives.length)];
  const b = animals[Math.floor(Math.random() * animals.length)];
  return `${a}${b}`;
}

const likert = [
  { label: "Not at all", score: 0 },
  { label: "Several days", score: 1 },
  { label: "More than half the days", score: 2 },
  { label: "Nearly every day", score: 3 },
];

const PHQ9 = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading or watching TV",
  "Moving or speaking slowly or being so fidgety that others notice",
  "Thoughts that you would be better off dead or of hurting yourself",
];

const GAD7 = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

type Scores = { phq9: number[]; gad7: number[] };

export default function Onboarding() {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem("sahaara-user"),
  );
  const [pseudo, setPseudo] = useState<string>(() => user || makePseudonym());
  const [screen, setScreen] = useState<"login" | "screening" | "done">(
    user ? "done" : "login",
  );
  const [scores, setScores] = useState<Scores>({
    phq9: Array(9).fill(0),
    gad7: Array(7).fill(0),
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("sahaara-user", user);
    }
  }, [user]);

  const phqTotal = scores.phq9.reduce((a, b) => a + b, 0);
  const gadTotal = scores.gad7.reduce((a, b) => a + b, 0);

  const phqSeverity =
    phqTotal >= 20
      ? "severe"
      : phqTotal >= 15
        ? "moderately severe"
        : phqTotal >= 10
          ? "moderate"
          : phqTotal >= 5
            ? "mild"
            : "minimal";
  const gadSeverity =
    gadTotal >= 15
      ? "severe"
      : gadTotal >= 10
        ? "moderate"
        : gadTotal >= 5
          ? "mild"
          : "minimal";

  const start = () => {
    setUser(pseudo);
    setScreen("screening");
  };

  const saveBaseline = () => {
    const baseline = {
      ts: Date.now(),
      phqTotal,
      gadTotal,
      phq: scores.phq9,
      gad: scores.gad7,
    };
    localStorage.setItem("sahaara-baseline", JSON.stringify(baseline));
    toast.success("Baseline screening saved");
    setScreen("done");
  };

  return (
    <section id="onboarding" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <UserCircle2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Anonymous Onboarding</h2>
      </div>
      {screen === "login" && (
        <div className="grid gap-4 rounded-xl border bg-card p-4 md:p-6">
          <p className="text-sm text-muted-foreground">
            Use a pseudonym to protect your privacy. You can link your college
            ID later if you choose professional support.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            />
            <button
              onClick={() => setPseudo(makePseudonym())}
              className="rounded-md border px-3 py-2 text-sm"
            >
              Shuffle
            </button>
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <LogIn className="h-4 w-4" /> Continue
            </button>
          </div>
          <details className="rounded-lg border bg-background p-3 text-sm">
            <summary className="cursor-pointer font-medium">
              Link college ID (optional)
            </summary>
            <div className="mt-2 grid gap-2 md:grid-cols-3">
              <input
                placeholder="Name (optional)"
                className="rounded-md border bg-background px-3 py-2 text-sm"
              />
              <input
                placeholder="College Email"
                className="rounded-md border bg-background px-3 py-2 text-sm"
              />
              <input
                placeholder="Student ID"
                className="rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              We only use this for appointments you explicitly book.
            </p>
          </details>
        </div>
      )}

      {screen === "screening" && (
        <div className="grid gap-6 rounded-xl border bg-card p-4 md:p-6">
          <div>
            <h3 className="font-medium">Baseline Screening (Gamified)</h3>
            <p className="text-sm text-muted-foreground">
              Answer honestly for a personalized experience. This is not a
              diagnosis.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg border bg-background p-3">
              <div className="mb-2 font-medium">PHQ-9 (Depression)</div>
              {PHQ9.map((q, i) => (
                <div key={i} className="mb-3">
                  <div className="text-sm mb-1">
                    {i + 1}. {q}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {likert.map((o, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setScores((s) => ({
                            ...s,
                            phq9: s.phq9.map((v, k) => (k === i ? o.score : v)),
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs ${scores.phq9[i] === o.score ? "bg-primary text-primary-foreground border-transparent" : "bg-background"}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border bg-background p-3">
              <div className="mb-2 font-medium">GAD-7 (Anxiety)</div>
              {GAD7.map((q, i) => (
                <div key={i} className="mb-3">
                  <div className="text-sm mb-1">
                    {i + 1}. {q}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {likert.map((o, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setScores((s) => ({
                            ...s,
                            gad7: s.gad7.map((v, k) => (k === i ? o.score : v)),
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs ${scores.gad7[i] === o.score ? "bg-primary text-primary-foreground border-transparent" : "bg-background"}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="rounded-md border bg-background p-3 text-sm">
              <span className="font-medium">PHQ-9:</span> {phqTotal}{" "}
              <span className="text-muted-foreground">({phqSeverity})</span>
            </div>
            <div className="rounded-md border bg-background p-3 text-sm">
              <span className="font-medium">GAD-7:</span> {gadTotal}{" "}
              <span className="text-muted-foreground">({gadSeverity})</span>
            </div>
            <button
              onClick={saveBaseline}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Save Baseline
            </button>
          </div>
        </div>
      )}

      {screen === "done" && (
        <div className="rounded-xl border bg-card p-4 md:p-6 text-sm">
          <p>
            Welcome back, <span className="font-medium">{user}</span>. Your
            baseline is saved. You can update it anytime.
          </p>
        </div>
      )}
    </section>
  );
}
