import { Session } from "@heroiclabs/nakama-js";
import { useCallback, useEffect, useState } from "react";

import { NkResponse } from "../interfaces";
import { useAuthState } from "../store/auth";
import { getAuthToken, getRefreshToken, parseError, setAuthToken, setRefreshToken } from "../util";

export const useAuth = () => {
  const client = useAuthState((state) => state.client);
  const isAuthenticated = useAuthState((state) => state.isAuthenticated);
  const setSocket = useAuthState((state) => state.setSocket);
  const setSession = useAuthState((state) => state.setSession);
  const setIsAuthenticated = useAuthState((state) => state.setIsAuthenticated);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const joinSession = useCallback(
    async (session: Session) => {
      const socket = client.createSocket();
      const socketSession = await socket.connect(session, true);

      setSocket(socket);
      setSession(socketSession);
      setIsAuthenticated(true);
    },
    [client, setIsAuthenticated, setSession, setSocket]
  );

  useEffect(() => {
    const refreshSession = async () => {
      const authToken = getAuthToken();
      const refreshToken = getRefreshToken();

      if (!authToken || !refreshToken) return setIsRefreshing(false);

      let session = Session.restore(authToken, refreshToken);

      try {
        if (session.isexpired(Date.now() / 1000)) {
          session = await client.sessionRefresh(session);
        }
        await joinSession(session);
      } catch (e) {
        // manual login required
        return;
      } finally {
        setIsRefreshing(false);
      }
    };
    refreshSession();
  }, [client, joinSession]);

  const authenticateUser = useCallback(
    async (username: string, password: string, newUser = false): Promise<NkResponse> => {
      if (isAuthenticated) return;
      try {
        setIsLoading(true);
        const session = await client.authenticateCustom(password, newUser, username);

        setAuthToken(session.token);
        setRefreshToken(session.refresh_token);

        await joinSession(session);
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, client, joinSession]
  );

  return {
    authenticateUser,
    isLoading,
    isRefreshing,
    isAuthenticated,
  };
};
