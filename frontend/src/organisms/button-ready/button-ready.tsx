import { FC } from "react";

import { buttonPress, text } from "../../assets";
import { usePlaySound } from "../../hooks";
import { PrimaryButton } from "../../molecules";
import { useLocalPlayer, useMatch } from "../../service";
import { useStore } from "../../store";

export const ButtonReady: FC = () => {
  const { broadcastPlayerReady } = useMatch();

  const localPlayer = useLocalPlayer();
  const isLoser = localPlayer?.status === "lost";

  const isPlayerReady = useStore((state) => state.isPlayerReady);
  const setPlayerReady = useStore((state) => state.setPlayerReady);
  const playSound = usePlaySound();

  const handleClick = () => {
    setPlayerReady(true);
    broadcastPlayerReady();
    playSound(buttonPress);
  };

  return <PrimaryButton disabled={isLoser} primaryText={text.match.goForIt} onClick={() => handleClick()} isLoading={isPlayerReady} />;
};
