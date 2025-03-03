import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./Login";
import { ForgotPassword } from "./ForgotPassword";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};
