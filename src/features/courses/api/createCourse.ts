import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { toast } from "sonner";

import type { TypeCourse } from "../types";

interface ICreateCourse {
  name: string;
}

export const createCourse = async (
  data: ICreateCourse
): Promise<TypeCourse> => {
  const res = await axios.post(`/api/v1/course/`, data);
  return res.data;
};

type UseCreateCourseOptions = {
  config?: MutationConfig<typeof createCourse>;
};

export const useCreateCourse = ({ config }: UseCreateCourseOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ["course"],
    mutationFn: (data) => createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
      toast.success("Success", {
        description: "Course created successfully",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};
