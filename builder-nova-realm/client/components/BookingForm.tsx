import { CalendarDays, Lock, MapPin, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const counsellors = [
  {
    id: "c1",
    name: "Dr. Meera Rao",
    dept: "Psychology",
    location: "Wellness Center, Block A",
    phone: "+91-80000-11111",
    languages: ["en", "hi"],
  },
  {
    id: "c2",
    name: "Mr. Arjun Patel",
    dept: "Counselling",
    location: "Student Support, Block C",
    phone: "+91-80000-22222",
    languages: ["en", "gu", "hi"],
  },
  {
    id: "c3",
    name: "Ms. Nandini Iyer",
    dept: "Student Welfare",
    location: "Health Unit, Block B",
    phone: "+91-80000-33333",
    languages: ["en", "ta", "te"],
  },
];

type Booking = {
  id: string;
  name: string;
  email: string;
  reason: string;
  counsellorId: string;
  date: string;
  time: string;
  preferredLang?: string;
  confidential: boolean;
};

export default function BookingForm() {
  const [form, setForm] = useState<Booking>({
    id: "",
    name: "",
    email: "",
    reason: "",
    counsellorId: counsellors[0].id,
    date: "",
    time: "",
    preferredLang: "en",
    confidential: true,
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("sahaara-bookings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sahaara-bookings", JSON.stringify(bookings));
  }, [bookings]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      toast.error("Please complete all required fields");
      return;
    }
    const booking: Booking = { ...form, id: crypto.randomUUID() };
    setBookings((b) => [booking, ...b]);
    toast.success("Confidential appointment request submitted");
    setForm({
      id: "",
      name: "",
      email: "",
      reason: "",
      counsellorId: counsellors[0].id,
      date: "",
      time: "",
      preferredLang: "en",
      confidential: true,
    });
  };

  return (
    <section id="booking" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <Lock className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Confidential Booking</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="grid gap-3 rounded-xl border bg-card p-4 md:p-6"
        >
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-1">
              <label className="text-sm">Full name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-md border bg-background px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-md border bg-background px-3 py-2 text-sm"
                required
              />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="grid gap-1">
              <label className="text-sm">Counsellor</label>
              <select
                value={form.counsellorId}
                onChange={(e) =>
                  setForm({ ...form, counsellorId: e.target.value })
                }
                className="rounded-md border bg-background px-3 py-2 text-sm"
              >
                {counsellors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Preferred language</label>
              <select
                value={form.preferredLang}
                onChange={(e) =>
                  setForm({ ...form, preferredLang: e.target.value })
                }
                className="rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="mr">Marathi</option>
                <option value="gu">Gujarati</option>
              </select>
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Reason (optional)</label>
              <input
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Stress, sleep, anxiety..."
              />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="grid gap-1">
              <label className="text-sm">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-md border bg-background px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="rounded-md border bg-background px-3 py-2 text-sm"
                required
              />
            </div>
            <label className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={form.confidential}
                onChange={(e) =>
                  setForm({ ...form, confidential: e.target.checked })
                }
              />{" "}
              Confidential, private booking
            </label>
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-95"
          >
            <CalendarDays className="h-4 w-4" /> Book appointment
          </button>
        </form>
        <div className="grid content-start gap-4">
          <div className="rounded-xl border bg-card p-4 md:p-6">
            <h3 className="mb-1 font-medium">Offline Support Mapping</h3>
            <p className="text-sm text-muted-foreground">
              Find on-campus counsellors and helplines.
            </p>
            <ul className="mt-3 space-y-3">
              {counsellors.map((c) => (
                <li key={c.id} className="rounded-lg border bg-background p-3">
                  <div className="font-medium">
                    {c.name}{" "}
                    <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      {c.dept}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {c.location}
                    </span>
                    <a
                      className="inline-flex items-center gap-1 hover:text-foreground"
                      href={`tel:${c.phone}`}
                    >
                      <Phone className="h-4 w-4" />
                      {c.phone}
                    </a>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Languages: {c.languages.join(", ")}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-4 md:p-6">
            <h3 className="mb-1 font-medium">Recent Requests</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground max-h-48 overflow-auto pr-1">
              {bookings.length === 0 && <li>No requests yet.</li>}
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between rounded-md border bg-background px-3 py-2"
                >
                  <span>
                    {b.name} ·{" "}
                    {new Date(
                      b.id ? Date.now() : Date.now(),
                    ).toLocaleDateString()}
                  </span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-xs">
                    {counsellors.find((c) => c.id === b.counsellorId)?.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
