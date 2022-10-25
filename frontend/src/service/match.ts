// import { DiceRolls } from "./fake-dice-rolls";

export const useMatch = () => {
  // const socket = useAuthState((state) => state.socket);
  // const matchId = useMatchMakerState((state) => state.matchId);
  // const setPowerUpIds = useMatchState((state) => state.setPowerUpIds);
  // const setDiceRollsAmount = useMatchState((state) => state.setDiceRollsAmount);
  // const [isLoading, setIsLoading] = useState(false);

  // const getPowerUps = useCallback(async (): Promise<NkResponse> => {
  //   try {
  //     if (!socket) throw new Error(error.noSocketConnected);

  //     setIsLoading(true);
  //     // TODO: add call to backend
  //     // give it the match settings? or match id is enough
  //     // const powerUps: PowerUp[] = await socket.getPowerUps(matchId);
  //     const powerUps = [""];
  //     setPowerUpIds(powerUps);
  //     // TODO: in store send message to backend that the power ups have been displayed
  //   } catch (error) {
  //     const parsedErr = await parseError(error);
  //     return parsedErr;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [setPowerUpIds, socket]);

  // const rollDice = useCallback(async (): Promise<NkResponse> => {
  //   try {
  //     if (!socket) throw new Error(error.noSocketConnected);

  //     setIsLoading(true);
  //     // TODO: add call to backend
  //     const diceRolls = DiceRolls;
  //     setDiceRollsAmount(diceRolls);
  //     // TODO: in store send message to backend that the power ups have been displayed
  //   } catch (error) {
  //     const parsedErr = await parseError(error);
  //     return parsedErr;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [setDiceRollsAmount, socket]);

  return {
    // getPowerUps,
    // rollDice,
    // isLoading,
  };
};
