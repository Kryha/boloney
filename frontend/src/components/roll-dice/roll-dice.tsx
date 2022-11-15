import { FC } from "react";

import { text } from "../../assets";
import { BottomButtonWrapper, Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useMatch } from "../../service";
import { MatchOpCode } from "../../types";
import { useStore } from "../../store";

// TODO: finish component
export const RollDice: FC = () => {
  const { broadcastPlayerReady, sendMatchState } = useMatch();
  const hasRolledDice = useStore((state) => state.hasRolledDice);

  const handleRoll = () => {
    if (hasRolledDice) {
      broadcastPlayerReady();
    } else {
      sendMatchState(MatchOpCode.ROLL_DICE);
    }
  };

  return (
    <BottomButtonWrapper>
      <Heading1>{text.match.rollDice}</Heading1>
      <PrimaryButton text={hasRolledDice ? text.match.goForIt : text.match.rollDice} onClick={() => handleRoll()} />
    </BottomButtonWrapper>
  );
};
