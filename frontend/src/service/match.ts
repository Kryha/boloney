import { MatchData } from "@heroiclabs/nakama-js";
import { useCallback, useEffect, useState } from "react";
import { text } from "../assets";
import { useAuthState, useMatchMakerState } from "../store";
import { useMatchState } from "../store/match";
import { MatchOpCode, NkResponse, RoundStage } from "../types";
import { parseError } from "../util";
import { fakeDiceRolls } from "./fake-dice-rolls";
import { fakePowerUps } from "./fake-power-ups";

// ask about error handling
export const useMatch = () => {
  const socket = useAuthState((state) => state.socket);
  const setRoundStage = useMatchState((state) => state.setRoundStage);
  const roundStage = useMatchState((state) => state.roundStage);
  const setPowerUps = useMatchState((state) => state.setPowerUps);
  const setFaceValues = useMatchState((state) => state.setFaceValues);
  const matchId = useMatchMakerState((state) => state.matchId);
  const [isLoading, setIsLoading] = useState(false);

  if (!socket) throw new Error(text.error.noSocketConnected);

  useEffect(() => {
    socket.onmatchdata = (matchData: MatchData) => {
      if (matchData.op_code === MatchOpCode.STAGE_TRANSITION) {
        // setRoundStage(matchData.data.matchStage);
        setRoundStage(RoundStage.ROLL_DICE_STAGE);
        // add a switch statement and then save data based on stage
        // TODO: use matchData.data.matchStage
        switch (roundStage) {
          case RoundStage.GET_POWERUP_STAGE:
            setPowerUps(fakePowerUps);
            break;
          case RoundStage.ROLL_DICE_STAGE:
            setFaceValues(fakeDiceRolls);
            break;
          case RoundStage.PLAYER_TURN_STAGE:
            // TODO: add other phases
            break;
          case RoundStage.ROUND_SUMMARY_STAGE:
            break;
          case RoundStage.END_OF_MATCH_STAGE:
            break;
          default:
            // add an error
            setPowerUps(fakePowerUps);
            break;
        }
      }
    };
  }, [roundStage, setFaceValues, setPowerUps, setRoundStage, socket]);

  const sendMatchState = useCallback(
    async (payload: string): Promise<NkResponse> => {
      try {
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
