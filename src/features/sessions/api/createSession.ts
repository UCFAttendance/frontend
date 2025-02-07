import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import type { TypeSession } from "../types";

interface ICreateSession {
  courseId: string;
  faceRecognitionEnabled: boolean;
  locationEnabled: boolean;
  longtitute?: number;
  latitude?: number;
}

export const createSession = async (
  data: ICreateSession
): Promise<TypeSession> => {
  const res = await axios.post(`/api/v1/session/`, {
    course_id: data.courseId,
    face_recognition_enabled: data.faceRecognitionEnabled,
    location_enabled: data.locationEnabled,
    longtitute: data.longtitute,
    latitude: data.latitude,
  });
  return res.data;
};

type UseCreateSessionOptions = {
  config?: MutationConfig<typeof createSession>;
};

export const useCreateSession = ({ config }: UseCreateSessionOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: (data) => createSession(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["course", `${data.course_id}`, "session"]);
      toast.success("Success", {
        description: "Session created successfully",
      });
    },
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });
};
