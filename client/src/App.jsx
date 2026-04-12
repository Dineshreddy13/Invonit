import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OtpVerification from "./pages/auth/VerifyOtp";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import PasswordReset from "./pages/auth/PasswordReset";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/verify" element={<OtpVerification />} />
          <Route path="reset-password" element={<PasswordReset />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}