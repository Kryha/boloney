import { useEffect, useState } from "react";

import { text } from "../assets/text";
import { DEFAULT_POOL_MAX_PLAYERS, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_QUERY, RPC_CREATE_MATCH } from "../constants";
import { useSession, useStore } from "../store";
import { MatchJoinMetadata, MatchSettings, NkResponse } from "../types";
import { parseError } from "../util";
import { joinChat } from "./chat";
import { nakama } from "./nakama";
import { getHashChain } from "./zk-toolkit";

export const useJoinMatch = (matchId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const setMatchId = useStore((state) => state.setMatchId);
  const setIsJoining = useStore((state) => state.setIsJoining);
  const setChannelId = useStore((state) => state.setChannelId);
  const clearMessages = useStore((state) => state.clearMessages);
  const aleoAccount = useStore((state) => state.aleoAccount);

  useEffect(() => {
    const joinMatch = async () => {
      if (!session?.username || !aleoAccount) return;
      try {
        setIsJoining(true);
        const tkData = await getHashChain(aleoAccount);

        const metadata: MatchJoinMetadata = { username: session.username, hashChain: tkData.hashChain, seed: tkData.seed };
        const match = await nakama.socket.joinMatch(matchId, undefined, { data: JSON.stringify(metadata) });
        const channelId = await joinChat(match.match_id);

        setMatchId(match.match_id);
        setChannelId(channelId);
        clearMessages();
      } catch (error) {
        setIsJoining(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    joinMatch();
  }, [aleoAccount, clearMessages, matchId, session, setChannelId, setIsJoining, setMatchId]);

  return isLoading;
};

export const createMatch = async (settings: MatchSettings): Promise<NkResponse<string>> => {
  try {
    const rpcRes = await nakama.socket.rpc(RPC_CREATE_MATCH, JSON.stringify(settings));
    if (!rpcRes.payload) throw new Error(text.error.noPayloadReturned);

    const parsed = JSON.parse(rpcRes.payload);
    if (!parsed.match_id) throw new Error(text.error.receivedUnexpectedPayload);

    return parsed.match_id;
  } catch (error) {
    const parsedErr = await parseError(error);
    return parsedErr;
  }
};

export const joinPool = async () => {
  try {
    await nakama.socket.addMatchmaker(DEFAULT_POOL_QUERY, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_MAX_PLAYERS);
  } catch (error) {
    console.info(error);
  }
};
