import { FC } from "react";

import { useLocalPlayer } from "../../service";
import { ErrorView } from "../error-view";
import { ActivePlayerTurns } from "./active-player-turn";
import { PassivePlayerTurns } from "./passive-player-turn";

// TODO: Add payload to the broadcasted message
export const PlayerTurns: FC = () => {
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  return <>{localPlayer.isActive ? <ActivePlayerTurns /> : <PassivePlayerTurns />}</>;
};
