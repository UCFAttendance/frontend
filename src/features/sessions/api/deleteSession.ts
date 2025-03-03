import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { TypeSession } from "../types";

export const deleteSession = async (data: {
  sessionId: number;
}): Promise<TypeSession> => {
  const res = await axios.delete(`/api/v1/session/${data.sessionId}/`);
  return res.data;
};

type UseDeleteSessionOptions = {
  config?: MutationConfig<typeof deleteSession>;
};

export const useDeleteSession = ({ config }: UseDeleteSessionOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (data) => deleteSession(data),
    onSuccess: () => {
      toast.success("Success", {
        description: "Session deleted successfully",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};
