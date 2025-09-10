import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import { Globe } from "lucide-react";

function Header() {
  const location = useLocation();
  const { locale, setLocale } = useLanguage();

useEffect(() => {

  const handlePageLoad = () => {
    // Agar hash hai to element pe scroll karo
    if (location.hash) {
      try {
        const hash = location.hash.startsWith("#")
          ? location.hash.slice(1)
          : location.hash;
        const id = hash.split("?")[0];
        if (!id) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          return;
        }
        
        // DOM ready hone ka wait karo
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            // Element nahi mila to top pe jao
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }
        }, 100);
      } catch (e) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    } else {
      // Koi hash nahi hai to top pe jao
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  // Immediately call karo (page load/refresh ke liye)
  handlePageLoad();

}, [location.hash, location.pathname]); // Dependencies same rakhe hain
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-primary to-emerald-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-600">
            MindSpace
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a
            href="#onboarding"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Onboarding
          </a>
          <a
            href="#ai"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            AI First-Aid
          </a>
          <a
            href="#mood"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Mood
          </a>
          <a
            href="#screentime"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Screen Time
          </a>
          <a
            href="#booking"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Book Session
          </a>
          <a
            href="#resources"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Resources
          </a>
          <a
            href="#peer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Peer Support
          </a>
          <a
            href="#admin"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border bg-card px-2 py-1.5">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              aria-label="Select language"
              value={locale}
              onChange={(e) => setLocale(e.currentTarget.value as any)}
              className="bg-transparent text-sm outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="bn">বাংলা</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="mr">मराठी</option>
              <option value="gu">ગુજરાતી</option>
            </select>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Sahaara · Open-source campus mental
          health
        </p>
        <div className="flex gap-4">
          <a href="#resources" className="hover:text-foreground">
            Resources
          </a>
          <a href="#booking" className="hover:text-foreground">
            Counsellors
          </a>
          <a href="#admin" className="hover:text-foreground">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function AppLayout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
