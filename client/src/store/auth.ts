import { create } from "zustand";

import { STORAGE_KEY_ROLE, STORAGE_KEY_TOKEN } from "@/lib/constants.ts";

export type AuthState = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

export type AuthActions = {
  setIsAuthenticated: (isAuthenticated: AuthState["isAuthenticated"]) => void;
  setIsAdmin: (isAdmin: AuthState["isAdmin"]) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  setIsAuthenticated: (isAuthenticated: AuthState["isAuthenticated"]) =>
    set(() => ({ isAuthenticated })),
  setIsAdmin: (isAdmin: AuthState["isAdmin"]) => set(() => ({ isAdmin })),
  logout: () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_ROLE);

    return set(() => ({ isAuthenticated: false }));
  },
}));

export default useAuthStore;
