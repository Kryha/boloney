import { Session } from "@heroiclabs/nakama-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { STORAGE_ACCOUNT_COLLECTION, STORAGE_ADDRESS_KEY, STORAGE_KEYS_KEY } from "../constants";
import { routes } from "../navigation";
import { useSession, useStore } from "../store";
import { AleoAccount, aleoAccountSchema, NkResponse } from "../types";
import { isAuthenticationRoute, isKnownRoute, isLegalContentRoute, parseError } from "../util";
import { nakama } from "./nakama";

// TODO: use Aleo account through Wallet browser extension
const getAleoAccount = async (session: Session): Promise<AleoAccount> => {
  const aleoKeys = await nakama.client.readStorageObjects(session, {
    object_ids: [{ collection: STORAGE_ACCOUNT_COLLECTION, key: STORAGE_KEYS_KEY, user_id: session.user_id }],
  });
  const aleoAddress = await nakama.client.readStorageObjects(session, {
    object_ids: [{ collection: STORAGE_ACCOUNT_COLLECTION, key: STORAGE_ADDRESS_KEY, user_id: session.user_id }],
  });

  const keys = aleoKeys.objects.at(0)?.value;
  const address = aleoAddress.objects.at(0)?.value;
  const account = aleoAccountSchema.parse({ ...keys, ...address });

  return account;
};

export const useRefreshAuth = () => {
  const session = useSession();
  const authenticate = useStore((state) => state.authenticate);
  const setIsAuthenticating = useStore((state) => state.setIsAuthenticating);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const refreshSession = async () => {
      if (session) return;
      try {
        const newSession = await nakama.refreshSession();
        const aleoAccount = await getAleoAccount(newSession);

        authenticate(newSession, aleoAccount);
      } catch (e) {
        if (!isAuthenticationRoute(pathname) && isKnownRoute(pathname) && !isLegalContentRoute(pathname)) navigate(routes.login);
        return;
      } finally {
        setIsAuthenticating(false);
      }
    };
    refreshSession();
  }, [authenticate, navigate, pathname, session, setIsAuthenticating]);
};

export const useAuthenticateUser = () => {
  const session = useSession();
  const authenticate = useStore((state) => state.authenticate);
  const [isLoading, setIsLoading] = useState(false);

  const authenticateUser = async (username: string, password: string, newUser = false): Promise<NkResponse> => {
    if (session) return;
    try {
      setIsLoading(true);
      const newSession = await nakama.authenticate(username, password, newUser);
      const aleoAccount = await getAleoAccount(newSession);
      authenticate(newSession, aleoAccount);
    } catch (error) {
      console.warn(error);
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticateUser, isLoading };
};

export const useLogout = () => {
  const resetAuth = useStore((state) => state.resetAuth);

  const logout = () => {
    nakama.reset();
    resetAuth();
  };

  return logout;
};
