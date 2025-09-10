import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";

export default function NudgesCard() {
  const [enabled, setEnabled] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("sahaara-nudges") || "true"),
  );
  useEffect(
    () => localStorage.setItem("sahaara-nudges", JSON.stringify(enabled)),
    [enabled],
  );
  return (
    <section id="nudges" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <BellRing className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Nudge System</h2>
      </div>
      <div className="rounded-xl border bg-card p-4 md:p-6 text-sm">
        <p className="text-muted-foreground">
          Gentle reminders for breaks and seasonal motivation during exams. You
          can turn this {enabled ? "off" : "on"} anytime.
        </p>
        <label className="mt-3 inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />{" "}
          Enable nudges
        </label>
      </div>
    </section>
  );
}
