import { text } from "../../assets";
import { BottomButtonWrapper } from "../../atoms";
import { MatchHeading } from "../match-heading";

export const WaitingForPlayers = () => {
  return (
    <BottomButtonWrapper>
      <MatchHeading headingOne={text.powerUps.timeToWait} headingTwo={text.powerUps.waitForPlayers} isAnimated />
    </BottomButtonWrapper>
  );
};
