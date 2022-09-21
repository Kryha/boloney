import { useCallback, useState } from "react";
import { APPEAR_ONLINE } from "../constants";
import { useAuthState } from "../store/auth";

export const useAuth = () => {
  const client = useAuthState((state) => state.client);
  const isAuthenticated = useAuthState((state) => state.isAuthenticated);
  const setSocket = useAuthState((state) => state.setSocket);
  const setSession = useAuthState((state) => state.setSession);
  const setIsAuthenticated = useAuthState((state) => state.setIsAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const authenticateUser = useCallback(
    async (email: string, password: string) => {
      if (isAuthenticated) return;
      try {
        setIsLoading(true);
        const session = await client.authenticateEmail(email, password, APPEAR_ONLINE);
        const socket = client.createSocket();
        const socketSession = await socket.connect(session, true);
        setSocket(socket);
        setSession(socketSession);
        setIsAuthenticated(true);
      } catch (error) {
        // TODO: add error handling
        console.log(error);
      }
      setIsLoading(false);
    },
    [isAuthenticated, client, setIsAuthenticated, setSession, setSocket]
  );

  return {
    authenticateUser,
    isLoading,
    isAuthenticated,
  };
};
