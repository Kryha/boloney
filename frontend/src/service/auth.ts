import { DecryptPermission, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { LeoWalletAdapter, LeoWalletName } from "@demox-labs/aleo-wallet-adapter-leo";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { Session } from "@heroiclabs/nakama-js";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AUTH_SIGN_MESSAGE, STORAGE_ACCOUNT_COLLECTION, STORAGE_ADDRESS_KEY, STORAGE_KEYS_KEY } from "../constants";
import { routes } from "../navigation";
import { useSession, useStore } from "../store";
import { AleoAccount, aleoAccountSchema, isNkError, NkError, NkResponse } from "../types";
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
  const authenticate = useStore((state) => state.authenticate);
  const setIsAuthenticating = useStore((state) => state.setIsAuthenticating);
  const session = useSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logOut = useLogout();
  const { connect: connectWallet, wallet } = useWallet();

  useEffect(() => {
    const refreshSession = async () => {
      if (session) {
        if (session.isexpired(Date.now() / 1000)) logOut();
        return;
      }

      try {
        const newSession = await nakama.refreshSession();
        if (!newSession || !wallet) return;

        const aleoAccount = await getAleoAccount(newSession);
        await connectWallet(DecryptPermission.ViewKeyAccess, WalletAdapterNetwork.Testnet);

        authenticate(newSession, aleoAccount);
      } catch (e) {
        if (!isAuthenticationRoute(pathname) && isKnownRoute(pathname) && !isLegalContentRoute(pathname)) navigate(routes.login);
        return;
      } finally {
        setIsAuthenticating(false);
      }
    };
    refreshSession();
  }, [authenticate, connectWallet, logOut, navigate, pathname, session, setIsAuthenticating, wallet]);
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

export const useWalletAuth = () => {
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);

  const { connected, publicKey, connect, select, wallet, connecting } = useWallet();
  const { authenticateUser } = useAuthenticateUser();
  const navigate = useNavigate();

  const isCheckingSign = useRef(false);
  const authTriggered = useRef(false);

  const [status, setStatus] = useState<"connecting" | "checking-signature" | "success" | "error">();
  const [error, setError] = useState<NkError>();
  const [username, setUsername] = useState<string>();
  const [signature, setSignature] = useState<string>();

  useEffect(() => {
    const connect = async () => {
      if (connecting || !wallet || !publicKey || !authTriggered.current || isCheckingSign.current) return;
      isCheckingSign.current = true;

      try {
        const adapter = wallet.adapter as LeoWalletAdapter;

        let newSignature = signature;
        if (!newSignature) {
          const bytes = new TextEncoder().encode(AUTH_SIGN_MESSAGE);
          const signatureBytes = await adapter.signMessage(bytes);
          newSignature = new TextDecoder().decode(signatureBytes);

          setSignature(newSignature);
        }

        const secondParam = username ? `${newSignature};${username.trim().toLowerCase()}` : newSignature;

        const res = await authenticateUser(publicKey, secondParam);

        if (isNkError(res)) {
          setError(res);
          setStatus("error");
        } else {
          setStatus("success");
          navigate(`${routes.welcome}?newUser=${!!username}`);
        }
      } catch (error) {
        console.warn(error);
        setStatus("error");
      }
      isCheckingSign.current = false;
      authTriggered.current = false;
      setSpinnerVisibility(false);
    };

    connect();
  }, [authenticateUser, connecting, navigate, publicKey, setSpinnerVisibility, signature, username, wallet]);

  const authenticateWallet = async (newUsername?: string, signature?: string) => {
    setSpinnerVisibility(true);

    try {
      setStatus("connecting");
      setUsername(newUsername);
      setSignature(signature);
      select(LeoWalletName);

      if (!connected) {
        await connect(DecryptPermission.ViewKeyAccess, WalletAdapterNetwork.Testnet);
      }

      setStatus("checking-signature");
      authTriggered.current = true;
    } catch (error) {
      console.warn(error);
      setStatus("error");
      setSpinnerVisibility(false);
    }
  };

  return { authenticateWallet, status, error, signature };
};

export const useLogout = () => {
  const resetAuth = useStore((state) => state.resetAuth);
  const { disconnect } = useWallet();

  const logout = async () => {
    await disconnect();
    nakama.reset();
    resetAuth();
  };

  return logout;
};
