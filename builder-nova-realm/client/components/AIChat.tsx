import { useEffect, useMemo, useRef, useState } from "react";
import { Send, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
  severity?: "mild" | "moderate" | "severe";
};

const translations: Record<
  string,
  { placeholder: string; intro: string; disclaimer: string; send: string }
> = {
  en: {
    placeholder: "Type how you feel or ask for help...",
    intro:
      "This AI guide offers immediate coping strategies and can suggest professional help when needed.",
    disclaimer: "Not a diagnosis. For emergencies call your local helpline.",
    send: "Send",
  },
  hi: {
    placeholder: "अपनी बात लिखें या मदद माँगें...",
    intro:
      "यह AI तुरंत सहायक सुझाव देता है और आवश्यक होने पर विशेषज्ञ से मिलने की सलाह देता है।",
    disclaimer:
      "यह निदान नहीं है। आपातकाल में अपने स्थानीय हेल्पलाइन पर कॉल करें।",
    send: "भेजें",
  },
  bn: {
    placeholder: "আপনার অনুভূতি লিখুন বা সাহায্য চান...",
    intro:
      "এই AI তাৎক্ষণিক সহায়ক কৌশল দেয় এবং প্রয়োজনে বিশেষজ্ঞের কাছে যাওয়ার পরামর্শ দেয়।",
    disclaimer: "এটি কোনো নির্ণয় নয়। জরুরিতে স্থানীয় হেল্প��াইনে কল করুন।",
    send: "পাঠান",
  },
  te: {
    placeholder: "మీ భావాలను టైప్ చేయండి లేదా సహాయం అడగండి...",
    intro:
      "ఈ AI వెంటనే సహాయక పద్ధతులను సూచిస్తుంది మరియు అవసరమైతే నిపుణులను సూచిస్తుంది.",
    disclaimer:
      "ఇది నిర్ధారణ కాదు. అత్యవసర పరిస్థితుల్లో స్థానిక హెల్ప్‌లైన్‌కు కాల్ చేయండి.",
    send: "పంపండి",
  },
  ta: {
    placeholder: "உங்கள் உணர்வுகளை எழுதுங்கள் அல்லது உதவி கேளுங்கள்...",
    intro:
      "இந்த AI உடனடி சமாளிக்கும் வழிகளை வழங்குகிறது மற்றும் தேவைப்பட்டால் நிபுணரை பரிந்துரைக்கிறது.",
    disclaimer:
      "இது ஒரு நோயறிதல் அல்ல. அவசரத்தில் உள்ளூர் உதவி எணை அழைக்கவும்.",
    send: "அனுப்பு",
  },
  mr: {
    placeholder: "तुमची भावना लिहा किंवा मदत मागा...",
    intro: "हा AI त्वरित मार्गदर्शन देतो आणि गरज पडल्यास तज्ञांची मदत सुचवतो.",
    disclaimer: "हे निदान नाही. आपत्कालीन स्थितीत स्थानिक हेल्पलाइनवर कॉल करा.",
    send: "पाठवा",
  },
  gu: {
    placeholder: "તમારી લાગણી લખો અથવા મદદ માગો...",
    intro:
      "આ AI તાત્કાલિક સહાયકારી સૂચનો આપે છે અને જરૂર��� હોય તો નિષ્ણાતની સલાહ આપે છે.",
    disclaimer: "આ નિદાન નથી. ઇમરજન્સીમાં સ્થાનિક હેલ્પલાઇન પર કૉલ કરો.",
    send: "મોકલો",
  },
};

function classifySeverity(text: string): "mild" | "moderate" | "severe" {
  const t = text.toLowerCase();
  if (
    /(suicide|kill myself|ending it|self.?harm|i don'?t want to live)/.test(t)
  )
    return "severe";
  if (
    /(can'?t cope|panic attack|no sleep for (2|two|3|three) days|hopeless)/.test(
      t,
    )
  )
    return "moderate";
  return "mild";
}

function responseFor(input: string) {
  const severity = classifySeverity(input);
  const text = input.toLowerCase();
  if (severity === "severe") {
    return {
      type: "crisis",
      severity,
      text: "If you are in danger or considering self-harm, please contact your local emergency number or the campus helpline immediately. You are not alone.",
    };
  }
  if (/anxiety|panic|anxious|stressed|stress/.test(text)) {
    return {
      type: "tip",
      severity,
      text: "Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s – repeat 4 times. Identify one small task you can complete today and take a 2-minute mindful break.",
    };
  }
  if (/sleep|insomnia|tired/.test(text)) {
    return {
      type: "tip",
      severity,
      text: "Create a wind-down routine: dim lights, avoid screens 60 minutes before bed, and try a body-scan relaxation. Keep a consistent sleep schedule.",
    };
  }
  if (/depress|sad|low|lonely|isolate/.test(text)) {
    return {
      type: "tip",
      severity,
      text: "Reach out to someone you trust today. Try a 10-minute walk outdoors. List 3 things within your control this week. Seeking help is a sign of strength.",
    };
  }
  return {
    type: "general",
    severity,
    text: "Thank you for sharing. Would you like evidence-based tips, campus resources, or to book a confidential session with a counsellor?",
  };
}

export default function AIChat() {
  const { locale } = useLanguage();
  const t = translations[locale] || translations.en;
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("sahaara-chat");
    return saved
      ? JSON.parse(saved)
      : [{ id: "welcome", role: "assistant", ts: Date.now(), text: t.intro }];
  });
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem("sahaara-chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: input.trim(),
      ts: Date.now(),
    };
    const r = responseFor(input.trim());
    const botMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: r.text,
      ts: Date.now(),
      severity: r.severity,
    };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  return (
    <section id="ai" className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">AI-guided First-Aid Support</h2>
      </div>
      <div className="grid gap-4 rounded-xl border bg-card p-4 md:p-6">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          {t.disclaimer}
        </p>
        <div className="h-64 overflow-y-auto rounded-lg border bg-background p-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"} max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow`}
              >
                {m.role === "assistant" && m.severity && (
                  <div
                    className={`mb-1 inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-[10px] ${m.severity === "severe" ? "bg-red-600 text-white" : m.severity === "moderate" ? "bg-amber-500 text-white" : "bg-emerald-600 text-white"}`}
                  >
                    {m.severity.toUpperCase()}
                  </div>
                )}
                <div>{m.text}</div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder={t.placeholder}
            className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={onSend}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-95"
          >
            <Send className="h-4 w-4" /> {t.send}
          </button>
        </div>
      </div>
    </section>
  );
}
