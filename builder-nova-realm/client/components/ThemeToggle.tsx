import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur hover:bg-card transition-colors"
    >
      {mounted &&
        (isDark ? (
          <>
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </>
        ))}
    </button>
  );
}
