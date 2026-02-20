"use client";
import { useThemeStore } from "@/stores/useThemeStore";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode } = useThemeStore();

  return (
    <body className="min-h-screen" data-theme={darkMode ? "dark" : "light"}>
      {children}
    </body>
  );
}
