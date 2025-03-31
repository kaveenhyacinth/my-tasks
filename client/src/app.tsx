import { useCallback, useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { useMutation } from "@tanstack/react-query";

import { ROLE_TYPE } from "../api/auth/login/types.ts";
import { api } from "../api";

import useAuthStore from "@/store/auth.ts";
import { STORAGE_KEY_ROLE, STORAGE_KEY_TOKEN } from "@/lib/constants.ts";
import { AppRoutes } from "@/routes/app-routes.tsx";
import { GlobalPreloader } from "@/components/molecules/GlobalPreloader.tsx";
import { messaging } from "@/firebase.ts";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);

  const [authChecked, setAuthChecked] = useState(false);

  const fcmTokenMutation = useMutation({
    mutationFn: api.employees.fcm_token.$put,
  });

  const checkAuth = () => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const role = localStorage.getItem(STORAGE_KEY_ROLE);

    setIsAdmin(role === ROLE_TYPE.ADMIN);
    setIsAuthenticated(!!token);
    setAuthChecked(true);
  };

  const requestNotificationPermission = useCallback(async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID,
        serviceWorkerRegistration: await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
        ),
      });

      fcmTokenMutation.mutate({
        body: { token },
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!authChecked || !isAuthenticated) return;

    (async () => {
      await requestNotificationPermission();
    })();
  }, [authChecked, isAuthenticated]);

  if (!authChecked) {
    return <GlobalPreloader />;
  }

  return <AppRoutes isAuthenticated={isAuthenticated} />;
}

export default App;
