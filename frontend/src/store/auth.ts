import { StateCreator } from "zustand";
import { Client, Socket } from "@heroiclabs/nakama-js";

import { API_PORT, API_URL, SERVER_KEY, USE_SSL } from "../constants";

export interface AuthSlice {
  client: Client;
  socket?: Socket;
  isAuthenticated: boolean;

  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setSocket: (socket: Socket) => void;
  reset: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  client: new Client(SERVER_KEY, API_URL, API_PORT, USE_SSL),
  isAuthenticated: false,

  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated: isAuthenticated })),

  reset: () => set(() => ({ socket: undefined, sessionState: undefined, isAuthenticated: false })),
});
