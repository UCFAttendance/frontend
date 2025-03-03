import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { toast } from "sonner";

export const deleteCourse = async (data: { courseId: number }) => {
  const res = await axios.delete(`/api/v1/course/${data.courseId}/`);
  return res.data;
};

type UseDeleteCourseOptions = {
  config?: MutationConfig<typeof deleteCourse>;
};

export const useDeleteCourse = ({ config }: UseDeleteCourseOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ["course"],
    mutationFn: (data) => deleteCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
      toast.success("Success", {
        description: "Course deleted successfully",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};
