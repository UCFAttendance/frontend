import type { TypeCourse } from "@/features/courses/types";
import type { AuthUser } from "@/features/auth";

export interface TypeSession {
  id: number;
  course_id: TypeCourse;
  start_time: string;
  end_time: string | null;
  face_recognition_enabled: boolean;
  location_enabled: boolean;
  longitude: number | null;
  latitude: number | null;
}

export interface TypeAttendance {
  id: number;
  session_id: TypeSession;
  student_id: Omit<AuthUser, "role"> & {
    role: "student";
  };
  created_at: string;
  face_recognition_status: "PENDING" | "SUCCESS" | "FAILED" | "NOT_REQUIRED";
  is_present: boolean;
}
