import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("elchai-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101116" : "#f2f0ea");
  }, [theme]);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="pulse-theme-toggle focus-ring"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === "light" ? (
        <Moon size={16} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Sun size={17} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  );
}
