import { Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  author: string;
  text: string;
  ts: number;
  approved: boolean;
}

export default function PeerSupport() {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("sahaara-peer");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "p1",
            author: "Anon",
            text: "Finals are overwhelming. Anyone else?",
            ts: Date.now() - 86400000,
            approved: true,
          },
          {
            id: "p2",
            author: "Anon",
            text: "Breathing exercises helped my anxiety before presentations.",
            ts: Date.now() - 43200000,
            approved: true,
          },
        ];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("sahaara-peer", JSON.stringify(posts));
  }, [posts]);

  const submit = () => {
    if (!text.trim()) return;
    const newPost: Post = {
      id: crypto.randomUUID(),
      author: "Anon",
      text: text.trim(),
      ts: Date.now(),
      approved: false,
    };
    setPosts((p) => [newPost, ...p]);
    setText("");
  };

  return (
    <section id="peer" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Peer Support (Moderated)</h2>
      </div>
      <div className="grid gap-4 rounded-xl border bg-card p-4 md:p-6">
        <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
          <Shield className="h-4 w-4" /> Posts appear after moderator approval
          by trained student volunteers.
        </p>
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Share an experience or ask a question (anonymous)"
            className="flex-1 rounded-full border bg-background px-4 py-2 text-sm"
          />
          <button
            onClick={submit}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
          >
            Post
          </button>
        </div>
        <ul className="space-y-3 max-h-64 overflow-auto pr-1">
          {posts.map((p) => (
            <li
              key={p.id}
              className="rounded-lg border bg-background p-3 text-sm"
            >
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {p.author} · {new Date(p.ts).toLocaleString()}
                </span>
                <span
                  className={`rounded px-2 py-0.5 ${p.approved ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}
                >
                  {p.approved ? "Approved" : "Pending"}
                </span>
              </div>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
