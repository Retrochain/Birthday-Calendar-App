import { useState, useEffect } from "react";

// This hook allows the user to cycle through different themes
export function useTheme() {
  // We first get the theme based on the user's dark or light mode preference
  const getInitialTheme = () => {
    // Check if window type is valid first
    if (typeof window !== "undefined") {
      // We get the currently stored theme in local storage if it exists
      const saved = localStorage.getItem("theme");

      // If it does, we return that one
      if (saved) return saved;

      // Otherwise we check if the user prefers a dark color scheme based on their browser light mode
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)",
      ).matches;

      // We then return dark or light mode depending on the results
      return prefersDark ? "dark" : "default";
    }

    // Otherwise we return a default light mode theme
    return "default";
  };

  // Set a variable to track the current theme
  const [theme, setTheme] = useState(getInitialTheme);

  // Get the theme stored in local storage and the appropriate background color class for it
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Helper function that checks if the passed theme is the same as the active theme
  const isActiveTheme = (t) => theme === t;

  // Function that sets a ring on the active theme and fades out other themes based on active theme
  const themeButtonClass = (t, colorClass) =>
    `w-6 h-6 rounded-full transition-all duration-200 ${colorClass} ${
      isActiveTheme(t)
        ? "ring-2 ring-offset-1 ring-gray scale-110 shadow-lg"
        : "opacity-60 hover:opacity-100"
    }`;

  return { theme, setTheme, themeButtonClass };
}
