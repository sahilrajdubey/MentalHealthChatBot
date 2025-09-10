import { BookOpen, Languages, PlayCircle, Waves } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const resources = [
  {
    id: "r1",
    type: "video",
    title: {
      en: "Understanding Anxiety",
      hi: "चिंता को समझना",
      bn: "উদ্বেগ বোঝা",
      te: "ఆందోళనను అర్థం చేసుకోవడం",
    },
    lang: "en",
    url: "https://www.youtube.com/watch?v=WWloIAQpMcQ",
  },
  {
    id: "r2",
    type: "audio",
    title: { en: "10-min Body Scan", hi: "10 मिनट बॉडी स्कैन" },
    lang: "en",
    url: "https://www.youtube.com/watch?v=gqXCboEL-7E",
  },
  {
    id: "r3",
    type: "guide",
    title: {
      en: "Sleep Hygiene Basics",
      hi: "नींद स्वच्छता के मूल",
      bn: "ঘুমের পরিচ্ছন্নতার মূল",
    },
    lang: "hi",
    url: "https://www.sleepfoundation.org/sleep-hygiene",
  },
  {
    id: "r4",
    type: "guide",
    title: { en: "PHQ-9 (Depression)", hi: "PHQ-9 (अवसाद)" },
    lang: "en",
    url: "https://www.apa.org/depression-guideline/patient-health-questionnaire.pdf",
  },
  {
    id: "r5",
    type: "video",
    title: { en: "Mindful Breathing in Hindi", hi: "सचेत श्वास" },
    lang: "hi",
    url: "https://www.youtube.com/watch?v=SEfs5TJZ6Nk",
  },
  {
    id: "r6",
    type: "guide",
    title: { en: "GAD-7 (Anxiety)", hi: "GAD-7 (चिंता)" },
    lang: "en",
    url: "https://www.hiv.uw.edu/page/mental-health-screening/gad-7",
  },
];

export default function ResourceHub() {
  const { locale } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const filtered = resources.filter(
    (r) => filter === "all" || r.type === filter,
  );

  return (
    <section id="resources" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          Psychoeducational Resource Hub
        </h2>
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full border px-3 py-1.5 text-sm ${filter === "all" ? "bg-primary text-primary-foreground border-transparent" : "bg-background"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("video")}
          className={`rounded-full border px-3 py-1.5 text-sm ${filter === "video" ? "bg-primary text-primary-foreground border-transparent" : "bg-background"}`}
        >
          Videos
        </button>
        <button
          onClick={() => setFilter("audio")}
          className={`rounded-full border px-3 py-1.5 text-sm ${filter === "audio" ? "bg-primary text-primary-foreground border-transparent" : "bg-background"}`}
        >
          Relaxation Audio
        </button>
        <button
          onClick={() => setFilter("guide")}
          className={`rounded-full border px-3 py-1.5 text-sm ${filter === "guide" ? "bg-primary text-primary-foreground border-transparent" : "bg-background"}`}
        >
          Guides
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary"
          >
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              {r.type === "video" && <PlayCircle className="h-4 w-4" />}
              {r.type === "audio" && <Waves className="h-4 w-4" />}
              {r.type === "guide" && <BookOpen className="h-4 w-4" />}
              <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs">
                {" "}
                <Languages className="h-3 w-3" /> {r.lang.toUpperCase()}
              </span>
            </div>
            <div className="text-sm font-medium leading-snug">
              {r.title[locale] || r.title.en}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Opens in new tab
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
