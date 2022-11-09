import { FC } from "react";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useMatch } from "../../service";

// TODO: finish component
export const PlayerTurns: FC = () => {
  const { broadcastPlayerReady } = useMatch();

  return (
    <BottomButtonWrapper>
      <Heading1>{text.match.playerTurns}</Heading1>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
