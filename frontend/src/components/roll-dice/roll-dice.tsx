import { FC, useState } from "react";

import { text } from "../../assets";
import { BottomButtonWrapper, Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useMatch } from "../../service";
import { MatchOpCode } from "../../types";

// TODO: finish component
export const RollDice: FC = () => {
  const [hasRolled, setHasRolled] = useState(false);
  const { broadcastPlayerReady, sendMatchState } = useMatch();

  const handleRoll = async () => {
    if (hasRolled) {
      await broadcastPlayerReady();
    } else {
      await sendMatchState(MatchOpCode.ROLL_DICE);
    }
    // TODO: handle this in state and update after receiving socket event
    setHasRolled((current) => !current);
  };

  return (
    <BottomButtonWrapper>
      <Heading1>{text.match.rollDice}</Heading1>
      <PrimaryButton text={hasRolled ? text.match.goForIt : text.match.rollDice} onClick={() => handleRoll()} />
    </BottomButtonWrapper>
  );
};
