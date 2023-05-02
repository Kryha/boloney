import axios from "axios";
import { useEffect, useRef } from "react";

import { env } from "../constants";
import { useStore } from "../store";
import { AleoAccount, getHashChainResSchema } from "../types";
import { commonErrors } from "../util";
import { useMatch } from "./match";

export const aleoClient = axios.create({ baseURL: env.VITE_TOOLKIT_URL, responseType: "json" });

export const getHashChain = async (aleoAccount: AleoAccount) => {
  const res = await axios.post(`${env.VITE_TOOLKIT_URL}/random/hash-chain-record`, {
    privateKey: aleoAccount.privateKey,
    viewKey: aleoAccount.viewKey,
    owner: aleoAccount.address,
  });
  const data = getHashChainResSchema.parse(res.data);
  return data;
};

export const useUpdateHashChain = () => {
  const aleoAccount = useStore((state) => state.aleoAccount);
  const matchSettings = useStore((state) => state.matchSettings);

  const { updateHashChain } = useMatch();
  const hashChainRequested = useRef(false);

  useEffect(() => {
    const fetch = async () => {
      hashChainRequested.current = true;
      try {
        if (!aleoAccount) throw new Error(commonErrors.notAuthenticated);
        const data = await getHashChain(aleoAccount);
        await updateHashChain(data);
      } catch (error) {
        console.warn("Hash chain update failed:", error);
      }
    };
    if (env.VITE_ZK_ENABLED && !hashChainRequested.current && matchSettings?.zkEnabled) fetch();
  }, [aleoAccount, matchSettings, updateHashChain]);
};
