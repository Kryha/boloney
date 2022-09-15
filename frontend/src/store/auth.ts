import create from "zustand";
import { Session, Client, Socket } from "@heroiclabs/nakama-js";

const useSSL = false;

export interface AuthState {
  client: Client;
  socket?: Socket;
  sessionState?: Session;
  authenticated: boolean;
  setSession: (session: Session) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setSocket: (socket: Socket) => void;
}

export const useAuthState = create<AuthState>()((set) => ({
  client: new Client("defaultkey", "api.localhost", "80", useSSL),
  authenticated: false,

  setSocket: (socket: Socket) => set(() => ({ socket: socket })),
  setSession: (session: Session) => set(() => ({ sessionState: session })),
  setAuthenticated: (isAuthenticated: boolean) => set(() => ({ authenticated: isAuthenticated })),
}));
