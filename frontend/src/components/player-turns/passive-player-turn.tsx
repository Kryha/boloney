import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useActivePlayer } from "../../service";
import { Heading2 } from "../atoms";
import { ErrorView } from "../error-view";
import { PassivePlayerWrapper } from "./styles";

export const PassivePlayerTurns: FC = () => {
  const activePlayer = useActivePlayer();

  if (!activePlayer) return <ErrorView />;

  return (
    <PassivePlayerWrapper>
      <Heading2>{text.match.timeToWait}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.param.playerIsMakingAMove(activePlayer.username)}</Heading2>
    </PassivePlayerWrapper>
  );
};
