"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const THEME_DARK = "dark";
const THEME_LIGHT = "light";

export default function ThemeToggle() {
  const [overrideOSTheme, setOverrideOSTheme] = useState(false);

  const { theme, setTheme } = useTheme();
  const isDark = theme === THEME_DARK;
  const switchTheme = () => {
    setOverrideOSTheme(true);
    setTheme(isDark ? THEME_LIGHT : THEME_DARK);
  };

  useEffect(() => {
    if (overrideOSTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () =>
      setTheme(mediaQuery.matches ? THEME_DARK : THEME_LIGHT);

    handleChange(); // Set theme on mount
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme, overrideOSTheme]);

  return (
    <Button variant="outline" size="icon" onClick={switchTheme}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
