import create from "zustand";
import { Session, Client, Socket } from "@heroiclabs/nakama-js";
import { API_PORT, API_URL, SERVER_KEY, USE_SSL } from "../constants";

export interface AuthState {
  client: Client;
  socket?: Socket;
  sessionState?: Session;
  isAuthenticated: boolean;
  setSession: (session: Session) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setSocket: (socket: Socket) => void;
}

export const useAuthState = create<AuthState>()((set) => ({
  client: new Client(SERVER_KEY, API_URL, API_PORT, USE_SSL),
  isAuthenticated: false,

  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setSession: (session: Session) => set(() => ({ sessionState: session })),
  setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated: isAuthenticated })),
}));

export const isSocketObject = (data: unknown): data is Socket => {
  return true;
};
