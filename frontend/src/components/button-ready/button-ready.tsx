import { FC } from "react";

import { text } from "../../assets";
import { useLocalPlayer, useMatch } from "../../service";
import { useStore } from "../../store";
import { PrimaryButton } from "../buttons";

// TODO: ready is reset (only in the UI) on refresh, fix this when updating the ready feature
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

  return (
    <PrimaryButton
      disabled={isLoser}
      primaryText={text.match.goForIt}
      onClick={() => handleClick()}
      isLoading={isPlayerReady}
      isBottomButton
    />
  );
};
