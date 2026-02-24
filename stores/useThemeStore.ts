import { create } from "zustand";

type ThemeStore = {
  darkMode: boolean;
  setDarkMode: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: false,
  setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
