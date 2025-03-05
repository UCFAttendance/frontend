import { authAxios } from "@/lib/axios";

import { UserResponse } from "../types";

export type ResetPasswordConfirmDTO = {
  uid: string;
  token: string;
  newPassword1: string;
  newPassword2: string;
};

export const resetPassowordConfirm = async (
  data: ResetPasswordConfirmDTO
): Promise<UserResponse> => {
  const response = await authAxios.post(
    "/api-auth/v1/password/reset/confirm/",
    {
      uid: data.uid,
      token: data.token,
      new_password1: data.newPassword1,
      new_password2: data.newPassword2,
    }
  );
  return response.data;
};
