import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as z from "zod";

import logo from "@/assets/logo.png";
import { resetPassowordConfirm } from "../api/resetPasswordConfirm";

const LoginSchema = z
  .object({
    newPassword1: z.string().min(1, "New password is required"),
    newPassword2: z.string(),
  })
  .refine((data) => data.newPassword1 === data.newPassword2, {
    message: "Passwords do not match",
    path: ["newPassword2"],
  });

const defaultValues = {
  newPassword1: "",
  newPassword2: "",
};

export const PasswordResetConfirm = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitSuccessful, errors },
  } = methods;
  const isError = Object.keys(errors).length > 0;

  const onSubmit = handleSubmit(async (values) => {
    if (!uid || !token) {
      setError("root", {
        type: "manual",
        message: "Invalid URL",
      });
      return;
    }

    try {
      await resetPassowordConfirm({ ...values, uid, token });
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Something went wrong. Please try again.",
      });
    }
  });

  console.log(errors);

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-32 w-auto" src={logo} alt="UCF logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {isSubmitSuccessful && !isError && (
          <div className="rounded-md bg-green-50 p-4 sm:mx-auto sm:w-full sm:max-w-sm mt-10">
            <div className="flex">
              <div className="shrink-0">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="size-5 text-green-400"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Password reset successfully!
                </h3>
              </div>
            </div>
          </div>
        )}

        {isError && (
          <div className="rounded-md bg-red-50 p-4 sm:mx-auto sm:w-full sm:max-w-sm mt-10">
            <div className="flex">
              <div className="shrink-0">
                <XCircleIcon
                  aria-hidden="true"
                  className="size-5 text-red-400"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  There were errors with your submission
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul role="list" className="list-disc space-y-1 pl-5">
                    {errors.newPassword1 && (
                      <li>{errors.newPassword1.message}</li>
                    )}
                    {errors.newPassword2 && (
                      <li>{errors.newPassword2.message}</li>
                    )}
                    {errors.root && <li>{errors.root.message}</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormProvider {...methods}>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="newPassword1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="text-sm">
                    <button
                      className="font-semibold text-blue-600 hover:text-blue-500"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register("newPassword1")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("newPassword2")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
