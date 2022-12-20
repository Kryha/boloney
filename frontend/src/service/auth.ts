import { useEffect, useState } from "react";

import { useSession, useStore } from "../store";
import { NkResponse } from "../types";
import { parseError } from "../util";
import { nakama } from "./nakama";

export const useRefreshAuth = () => {
  const session = useSession();
  const setSession = useStore((state) => state.setSession);
  const setIsAuthenticating = useStore((state) => state.setIsAuthenticating);

  useEffect(() => {
    const refreshSession = async () => {
      if (session) return;
      try {
        const newSession = await nakama.refreshSession();
        setSession(newSession);
      } catch (e) {
        // manual login required
        return;
      } finally {
        setIsAuthenticating(false);
      }
    };
    refreshSession();
  }, [session, setIsAuthenticating, setSession]);
};

export const useAuthenticateUser = () => {
  const session = useSession();
  const setSession = useStore((state) => state.setSession);
  const [isLoading, setIsLoading] = useState(false);

  const authenticateUser = async (username: string, password: string, newUser = false): Promise<NkResponse> => {
    if (session) return;
    try {
      setIsLoading(true);
      const newSession = await nakama.authenticate(username, password, newUser);
      setSession(newSession);
    } catch (error) {
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticateUser, isLoading };
};

export const useLogout = () => {
  const setSession = useStore((state) => state.setSession);

  const logout = () => {
    nakama.reset();
    setSession(undefined);
  };

  return logout;
};
