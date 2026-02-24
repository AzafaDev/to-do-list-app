import { create } from "zustand";

interface UserStore {
  user: {
    name: string;
    email: string;
    password: string;
  };
  setUser: (user: {name: string, email: string, password: string}) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "",
    email: "",
    password: "",
  },
  setUser: (user) => set(() => ({ user: user })),
}));