import { create } from "zustand";

export type AuthState = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

export type AuthActions = {
  setIsAuthenticated: (isAuthenticated: AuthState["isAuthenticated"]) => void;
  setIsAdmin: (isAdmin: AuthState["isAdmin"]) => void;
};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  setIsAuthenticated: (isAuthenticated: AuthState["isAuthenticated"]) =>
    set(() => ({ isAuthenticated })),
  setIsAdmin: (isAdmin: AuthState["isAdmin"]) => set(() => ({ isAdmin })),
}));

export default useAuthStore;
