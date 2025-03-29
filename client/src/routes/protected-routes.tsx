import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutesProps = {
  isAuthenticated: boolean;
};

export const ProtectedRoutes = ({ isAuthenticated }: ProtectedRoutesProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate replace to="/login" />;
};
