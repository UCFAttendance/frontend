import { useRoutes } from "react-router-dom";

import { useAuth } from "@/stores/useAuth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { ForgotPassword } from "@/features/auth/routes/ForgotPassword";

export const AppRoutes = () => {
  const auth = useAuth();

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([
    ...routes,
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ]);

  return <>{element}</>;
};
