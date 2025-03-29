import { useCallback, useEffect } from "react";

import useAuthStore from "@/store/auth.ts";
import { STORAGE_KEY_ROLE, STORAGE_KEY_TOKEN } from "@/lib/constants.ts";
import { ROLE_TYPE } from "@/components/types/role.ts";
import { AppRoutes } from "@/routes/app-routes.tsx";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);

    setIsAuthenticated(!!token);

    const role = localStorage.getItem(STORAGE_KEY_ROLE);

    setIsAdmin(role === ROLE_TYPE.ADMIN);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return <AppRoutes isAuthenticated={isAuthenticated} />;
}

export default App;
