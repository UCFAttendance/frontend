import { Navigate, Route, Routes } from "react-router-dom";

import { ForgotPassword } from "./ForgotPassword";
import { Login } from "./Login";
import { PasswordResetConfirm } from "./PasswordResetConfirm";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="password-reset-confirm" element={<PasswordResetConfirm />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};
