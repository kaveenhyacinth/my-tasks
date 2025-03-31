import { useEffect, useState } from "react";

import { ROLE_TYPE } from "../api/auth/login/types.ts";

import useAuthStore from "@/store/auth.ts";
import { STORAGE_KEY_ROLE, STORAGE_KEY_TOKEN } from "@/lib/constants.ts";
import { AppRoutes } from "@/routes/app-routes.tsx";
import { GlobalPreloader } from "@/components/molecules/GlobalPreloader.tsx";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);

  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const role = localStorage.getItem(STORAGE_KEY_ROLE);

    setIsAdmin(role === ROLE_TYPE.ADMIN);
    setIsAuthenticated(!!token);
    setAuthChecked(true);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (!authChecked) {
    return <GlobalPreloader />;
  }

  return <AppRoutes isAuthenticated={isAuthenticated} />;
}

export default App;
