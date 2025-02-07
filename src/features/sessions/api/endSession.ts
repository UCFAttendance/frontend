import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import type { TypeSession } from "../types";

interface IEndSession {
  sessionId: string | number;
}

export const endSession = async (data: IEndSession): Promise<TypeSession> => {
  const res = await axios.post(`/api/v1/session/${data.sessionId}/end/`);
  return res.data;
};

type UseEndSessionOptions = {
  config?: MutationConfig<typeof endSession>;
};

export const useEndSession = ({ config }: UseEndSessionOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (data) => endSession(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["course", `${data.course_id}`, "session"]);
      toast.success("Success", {
        description: "Session ended successfully",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};
