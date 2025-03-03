import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import type { TypeAttendanceReport } from "../types";

interface IOverrideAttendance {
  attendanceId: string | number;
}

export const overrideAttendance = async (
  data: IOverrideAttendance
): Promise<TypeAttendanceReport> => {
  const res = await axios.post(
    `/api/v1/attendance/${data.attendanceId}/override/`
  );
  return res.data;
};

type UseOverrideAttendanceOptions = {
  config?: MutationConfig<typeof overrideAttendance>;
};

export const useOverrideAttendance = ({
  config,
}: UseOverrideAttendanceOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (data) => overrideAttendance(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["attendance", `${data.id}`]);
      toast.success("Success", {
        description: "Attendance has been successfully overriden.",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};
