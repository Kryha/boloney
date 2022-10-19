import { useCallback, useState } from "react";
import { useAuthState, useMatchMakerState, useMatchState } from "../store";
import { NkResponse } from "../types";
import { error } from "../assets/text/error";
import { parseError } from "../util";
import { DiceRolls } from "./fake-dice-rolls";

// Should i update the round phase in the call backs
export const useMatch = () => {
  const socket = useAuthState((state) => state.socket);
  const matchId = useMatchMakerState((state) => state.matchId);
  const setPowerUpIds = useMatchState((state) => state.setPowerUpIds);
  const setDiceRollsAmount = useMatchState((state) => state.setDiceRollsAmount);
  const setRoundPhase = useMatchState((state) => state.setRoundPhase);
  const [isLoading, setIsLoading] = useState(false);

  const getRoundPhase = useCallback(
    async (): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(error.noSocketConnected);

        setIsLoading(true);
        // TODO: add call to backend
        // give it the match settings? or match id is enough
        // const powerUps: PowerUp[] = await socket.getPowerUps(matchId);
        const roundPhase = 3;
        setRoundPhase(roundPhase);
        // TODO: in store send message to backend that the power ups have been displayed
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [setRoundPhase, socket]
  );

  const getPowerUps = useCallback(
    async (): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(error.noSocketConnected);

        setIsLoading(true);
        // TODO: add call to backend
        // give it the match settings? or match id is enough
        // const powerUps: PowerUp[] = await socket.getPowerUps(matchId);
        const powerUps = [""];
        setPowerUpIds(powerUps);
        setRoundPhase(1);
        // TODO: in store send message to backend that the power ups have been displayed
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [setPowerUpIds, setRoundPhase, socket]
  );

  const rollDice = useCallback(
    async (): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(error.noSocketConnected);

        setIsLoading(true);
        // TODO: add call to backend
        const diceRolls = DiceRolls;
        setDiceRollsAmount(diceRolls);
        setRoundPhase(3);
        // TODO: in store send message to backend that the power ups have been displayed
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [setDiceRollsAmount, setRoundPhase, socket]
  );

  return {
    getPowerUps,
    rollDice,
    getRoundPhase,
    isLoading,
  };
};
