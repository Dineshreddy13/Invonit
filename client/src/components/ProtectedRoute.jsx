import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
}