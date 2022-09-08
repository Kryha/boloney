import create from "zustand";

import { Auth, Player } from "../interfaces";
import { Players } from "./fake-players";

export interface AuthState {
  user: Player | undefined;
  authenticateUser: (user: Auth) => void;
  isAuthenticated?: boolean;
  isError?: boolean;
}

export const useAuthState = create<AuthState>((set => ({
  user: {
    id: "",
    name: "",
    avatar: "",
    color: ""
  },
  isAuthenticated: false,
  isError: false,
  authenticateUser: (user: Auth) => {
    // TODO: call the sdk
    const player = Players[0];

    if (player) {
      set({ user: player, isAuthenticated: true, isError: false });
    }
    else {
      set({ isError: true });
    }
  }
})));
