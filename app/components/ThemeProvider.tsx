"use client";
import { useThemeStore } from "@/stores/useThemeStore";
import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { darkMode } = useThemeStore();

  return (
    <body className={`${darkMode ? "bg-[#171823]" : "bg-[#FAFAFA]"} min-h-screen w-full`}>
      {children}
    </body>
  );
}