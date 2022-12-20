import { StateCreator } from "zustand";
import { Session } from "@heroiclabs/nakama-js";

export interface AuthSlice {
  session?: Session;
  isAuthenticating: boolean;

  setSession: (session?: Session) => void;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  reset: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  session: undefined,
  isAuthenticating: true,

  setSession: (session) => set(() => ({ session })),
  setIsAuthenticating: (isAuthenticating) => set(() => ({ isAuthenticating })),
  reset: () => set(() => ({ session: undefined })),
});
