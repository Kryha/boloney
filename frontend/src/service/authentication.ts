import { useCallback, useState } from "react";
import { useAuthState } from "../store/auth";

export const useAuth = () => {
  const client = useAuthState((state) => state.client);
  const authenticated = useAuthState((state) => state.authenticated);
  const setSocket = useAuthState((state) => state.setSocket);
  const setSession = useAuthState((state) => state.setSession);
  const setAuthenticated = useAuthState((state) => state.setAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const appearOnline = true;

  const authenticateUser = useCallback(
    async (email: string, password: string) => {
      if (authenticated) return;
      try {
        setIsLoading(true);
        const session = await client.authenticateEmail(email, password, true);
        const socket = client.createSocket();
        const socketSession = await socket.connect(session, appearOnline);
        setSocket(socket);
        setSession(socketSession);
        setAuthenticated(true);
      } catch (error) {
        // TODO: add error handling
        console.log(error);
      }
      setIsLoading(false);
    },
    [appearOnline, authenticated, client, setAuthenticated, setSession, setSocket]
  );

  return {
    authenticateUser,
    isLoading,
    authenticated,
  };
};
