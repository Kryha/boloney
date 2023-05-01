import { StateCreator } from "zustand";
import { Session } from "@heroiclabs/nakama-js";

import { AleoAccount } from "../types";

export interface AuthSlice {
  session?: Session;
  isAuthenticating: boolean;
  aleoAccount?: AleoAccount;

  authenticate: (session: Session, aleoAccount: AleoAccount) => void;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  resetAuth: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  session: undefined,
  isAuthenticating: true,
  aleoAccount: undefined,

  authenticate: (session, aleoAccount) => set(() => ({ session, aleoAccount })),
  setIsAuthenticating: (isAuthenticating) => set(() => ({ isAuthenticating })),
  resetAuth: () => set(() => ({ session: undefined, aleoAccount: undefined })),
});
