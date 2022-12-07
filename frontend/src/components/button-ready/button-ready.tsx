import { FC } from "react";

import { text } from "../../assets";
import { useLocalPlayer, useMatch } from "../../service";
import { useStore } from "../../store";
import { PrimaryButton } from "../buttons";

export const ButtonReady: FC = () => {
  const { broadcastPlayerReady } = useMatch();

  const localPlayer = useLocalPlayer();
  const isLoser = localPlayer && localPlayer.status === "lost";

  const isPlayerReady = useStore((state) => state.isPlayerReady);
  const setPlayerReady = useStore((state) => state.setPlayerReady);

  const handleClick = () => {
    setPlayerReady(true);
    broadcastPlayerReady();
  };

  return <PrimaryButton disabled={isPlayerReady || isLoser} text={text.match.goForIt} onClick={() => handleClick()} />;
};
