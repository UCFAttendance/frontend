import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

import logo from "@/assets/logo.png";
import { useAuth } from "@/stores/useAuth";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

const defaultValues = {
  email: "",
};

export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  const methods = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const { register, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (values) => {
    forgotPassword(values.email);
  });

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-32 w-auto" src={logo} alt="UCF logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Send reset instructions
              </button>
            </div>

            <div className="text-sm text-center">
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Back to login
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
