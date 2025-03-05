import { authAxios } from "@/lib/axios";

import { UserResponse } from "../types";

export const forgotPassword = async (email: string): Promise<UserResponse> => {
  const response = await authAxios.post("/api-auth/v1/password/reset/", {
    email,
  });
  return response.data;
};
