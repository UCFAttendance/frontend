import {
  Description,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Dialog,
  Field,
  Label,
  Switch,
  Transition,
} from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Fragment, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import { useCreateSession } from "../api/createSession";

const CreateSessionSchema = z
  .object({
    faceRecognitionEnabled: z.boolean(),
    locationEnabled: z.boolean(),
    longtitute: z.number().optional(),
    latitude: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.locationEnabled) {
        return data.longtitute !== undefined && data.latitude !== undefined;
      }
      return true;
    },
    {
      message: "Location is required when location is enabled",
    }
  );

const defaultValues = {
  faceRecognitionEnabled: false,
  locationEnabled: false,
  longtitute: undefined,
  latitude: undefined,
};

interface CreateSessionProps {
  courseId: string;
}

export function CreateSession(props: CreateSessionProps) {
  const { courseId } = props;
  const [open, setOpen] = useState(false);
  const createSessionMutation = useCreateSession();

  const methods = useForm({
    resolver: zodResolver(CreateSessionSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = methods;

  const closeSlideOver = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const onSubmit = handleSubmit((values) => {
    createSessionMutation.mutate(
      {
        courseId,
        ...values,
      },
      {
        onSuccess: () => {
          closeSlideOver();
        },
        onError: (err: unknown) => {
          if (typeof err === "string") {
            setError("root", {
              type: "manual",
              message: err,
            });
          } else if (err instanceof AxiosError) {
            setError("root", {
              type: "manual",
              message: err.response?.data?.detail || "Something went wrong",
            });
          } else {
            setError("root", {
              type: "manual",
              message: "Something went wrong",
            });
          }
        },
      }
    );
  });

  return (
    <>
      <button
        type="button"
        className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => setOpen(true)}
      >
        Add Session
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeSlideOver}>
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                            Add Session
                          </DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              onClick={() => closeSlideOver()}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <FormProvider {...methods}>
                          {errors.root && (
                            <div className="mb-6 rounded-md bg-red-50 p-4">
                              <div className="flex">
                                <div className="shrink-0">
                                  <XCircleIcon
                                    className="h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-red-800">
                                    {errors.root.message}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          )}
                          <form onSubmit={onSubmit}>
                            <div>
                              <Field className="flex items-center justify-between">
                                <span className="flex grow flex-col">
                                  <Label
                                    as="span"
                                    passive
                                    className="text-sm/6 font-medium text-gray-900"
                                  >
                                    Facial Recognition
                                  </Label>
                                  <Description
                                    as="span"
                                    className="text-sm text-gray-500"
                                  >
                                    Attendees required to take a selfie to mark
                                    attendance
                                  </Description>
                                </span>
                                <Controller
                                  name="faceRecognitionEnabled"
                                  control={methods.control}
                                  render={({ field }) => (
                                    <Switch
                                      checked={field.value}
                                      onChange={field.onChange}
                                      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                      />
                                    </Switch>
                                  )}
                                />
                              </Field>
                            </div>
                            <div>
                              <Field className="flex items-center justify-between">
                                <span className="flex grow flex-col">
                                  <Label
                                    as="span"
                                    passive
                                    className="text-sm/6 font-medium text-gray-900"
                                  >
                                    GPS Location Required
                                  </Label>
                                  <Description
                                    as="span"
                                    className="text-sm text-gray-500"
                                  >
                                    Check this if you want to track the location
                                    of the attendees
                                  </Description>
                                </span>
                                <Controller
                                  name="locationEnabled"
                                  control={methods.control}
                                  render={({ field }) => (
                                    <Switch
                                      checked={field.value}
                                      onChange={field.onChange}
                                      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                      />
                                    </Switch>
                                  )}
                                />
                              </Field>
                            </div>
                            <div>
                              <Field className="flex items-center justify-between">
                                <span className="flex grow flex-col">
                                  <Label
                                    as="span"
                                    passive
                                    className="text-sm/6 font-medium text-gray-900"
                                  >
                                    Latitude
                                  </Label>
                                  <Description
                                    as="span"
                                    className="text-sm text-gray-500"
                                  >
                                    Latitude of the location
                                  </Description>
                                </span>

                                <input
                                  {...register("latitude")}
                                  type="number"
                                  step="0.0001"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="Latitude"
                                  disabled={
                                    !methods.getValues("locationEnabled")
                                  }
                                />
                              </Field>
                            </div>
                            <div>
                              <Field className="flex items-center justify-between">
                                <span className="flex grow flex-col">
                                  <Label
                                    as="span"
                                    passive
                                    className="text-sm/6 font-medium text-gray-900"
                                  >
                                    Longitude
                                  </Label>
                                  <Description
                                    as="span"
                                    className="text-sm text-gray-500"
                                  >
                                    Longitude of the location
                                  </Description>
                                </span>

                                <input
                                  {...register("longtitute")}
                                  type="number"
                                  step="0.0001"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="Longitude"
                                  disabled={
                                    !methods.getValues("locationEnabled")
                                  }
                                />
                              </Field>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => closeSlideOver()}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                                disabled={createSessionMutation.isLoading}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </FormProvider>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
