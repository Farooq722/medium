import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  loader: boolean;
  setUser: (user: User) => void;
  setLoader: (status: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loader: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setLoader: (status) => set({ loader: status }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user",
    }
  )
);
