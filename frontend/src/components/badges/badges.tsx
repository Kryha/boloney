import { CoolHand, Crown, text } from "../../assets";
import { GeneralText } from "../atoms";
import { BadgeWrapper } from "./styles";

export const WinnerBadge = () => {
  return (
    <BadgeWrapper>
      <Crown />
      <GeneralText>{text.playerTurn.winner}</GeneralText>
    </BadgeWrapper>
  );
};

export const LoserBadge = () => {
  return (
    <BadgeWrapper>
      <CoolHand />
      <GeneralText>{text.playerTurn.loser}</GeneralText>
    </BadgeWrapper>
  );
};
