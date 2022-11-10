import { StateCreator } from "zustand";
import { Session, Client, Socket } from "@heroiclabs/nakama-js";

import { API_PORT, API_URL, SERVER_KEY, USE_SSL } from "../constants";

export interface AuthSlice {
  client: Client;
  socket?: Socket;
  sessionState?: Session;
  isAuthenticated: boolean;
  setSession: (session: Session) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setSocket: (socket: Socket) => void;
  reset: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  client: new Client(SERVER_KEY, API_URL, API_PORT, USE_SSL),
  isAuthenticated: false,

  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setSession: (session: Session) => set(() => ({ sessionState: session })),
  setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated: isAuthenticated })),

  reset: () => set(() => ({ socket: undefined, sessionState: undefined, isAuthenticated: false })),
});
