import { useCallback, useState } from "react";

import { NkResponse } from "../interfaces";
import { useAuthState } from "../store/auth";
import { parseError } from "../util";

export const useAuth = () => {
  const client = useAuthState((state) => state.client);
  const isAuthenticated = useAuthState((state) => state.isAuthenticated);
  const setSocket = useAuthState((state) => state.setSocket);
  const setSession = useAuthState((state) => state.setSession);
  const setIsAuthenticated = useAuthState((state) => state.setIsAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const authenticateUser = useCallback(
    async (username: string, password: string, newUser = false): Promise<NkResponse> => {
      if (isAuthenticated) return;
      try {
        setIsLoading(true);
        const session = await client.authenticateCustom(password, newUser, username);
        const socket = client.createSocket();
        const socketSession = await socket.connect(session, true);
        setSocket(socket);
        setSession(socketSession);
        setIsAuthenticated(true);
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, client, setIsAuthenticated, setSession, setSocket]
  );

  return {
    authenticateUser,
    isLoading,
    isAuthenticated,
  };
};
