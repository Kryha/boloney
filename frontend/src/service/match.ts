import { MatchData } from "@heroiclabs/nakama-js";
import { useCallback, useEffect, useState } from "react";
import { text } from "../assets";
import { useStore } from "../store";
import { isStageTransition, MatchOpCode, NkResponse } from "../types";
import { parseError, parseMatchData } from "../util";
import { fakeDiceRolls } from "./fake-dice-rolls";
import { fakePowerUps } from "./fake-power-ups";

export const useMatch = () => {
  const socket = useStore((state) => state.socket);
  const setRoundStage = useStore((state) => state.setRoundStage);
  const roundStage = useStore((state) => state.roundStage);
  const setPowerUps = useStore((state) => state.setPowerUps);
  const setFaceValues = useStore((state) => state.setFaceValues);
  const matchId = useStore((state) => state.matchId);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.onmatchdata = (matchData: MatchData) => {
      if (matchData.op_code === MatchOpCode.STAGE_TRANSITION) {
        const payload = parseMatchData(matchData.data);
        if (!isStageTransition(payload)) return;

        switch (payload.matchStage) {
          case "getPowerUpStage":
            // TODO: remove fake data
            setPowerUps(fakePowerUps);
            break;
          case "rollDiceStage":
            // TODO: remove fake data
            setFaceValues(fakeDiceRolls);
            break;
          case "playerTurnLoopStage":
            // TODO: add other stages
            break;
          case "roundSummaryStage":
            break;
          case "endOfMatchStage":
            break;
        }
      }
    };
  }, [roundStage, setFaceValues, setPowerUps, setRoundStage, socket]);

  const sendMatchState = useCallback(
    async (payload: string): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(text.error.noSocketConnected);
        if (!matchId) throw new Error(text.error.noMatchIdFound);
        setIsLoading(true);

        socket.sendMatchState(matchId, MatchOpCode.PLAYER_READY, payload);
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [matchId, socket]
  );

  return {
    roundStage,
    isLoading,
    sendMatchState,
  };
};
