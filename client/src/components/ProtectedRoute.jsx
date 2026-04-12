import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = true; // later replace with token check

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}