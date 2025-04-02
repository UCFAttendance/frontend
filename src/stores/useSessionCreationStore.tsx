import { CreateSessionSchemaType } from "@/features/sessions/components/CreateSession";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SessionCreationStore {
  session: CreateSessionSchemaType |null;
  setSession: (session: CreateSessionSchemaType) => void;
}

export const useSessionCreationStore = create<SessionCreationStore>()(
  devtools(
    persist(
      (set) => ({
        session:  null,
        setSession: (session) => {
          set({ session });
        },
      }),
      { name: "session_creation" }
    )
  )
);
