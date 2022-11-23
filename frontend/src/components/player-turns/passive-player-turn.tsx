import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useStore } from "../../store";
import { Heading2 } from "../atoms";
import { ErrorView } from "../error-view";
import { PassivePlayerWrapper } from "./styles";

export const PassivePlayerTurns: FC = () => {
  const getActivePlayer = useStore((state) => state.getActivePlayer);
  const activePlayer = getActivePlayer();
  if (!activePlayer) return <ErrorView />;

  return (
    <PassivePlayerWrapper>
      <Heading2>{text.match.timeToWait}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.param.playerIsMakingAMove(activePlayer.username)}</Heading2>
    </PassivePlayerWrapper>
  );
};
