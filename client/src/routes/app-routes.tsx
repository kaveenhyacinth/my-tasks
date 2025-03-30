import { Navigate, useRoutes } from "react-router-dom";

import DashboardPage from "@/pages/DashboardPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import { ProtectedRoutes } from "@/routes/protected-routes.tsx";

type AppRoutesProps = {
  isAuthenticated: boolean;
};

export const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  const routes = [
    {
      path: "/",
      element: <Navigate replace to="/dashboard" />,
      exact: true,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <ProtectedRoutes isAuthenticated={isAuthenticated} />,
      children: [{ path: "/dashboard", element: <DashboardPage /> }],
    },
    { path: "*", element: <Navigate replace to="/login" /> },
  ];

  return useRoutes(routes);
};
