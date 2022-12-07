import { FC } from "react";

import { CoolHand, Crown, text } from "../../assets";
import { PlayerPublic } from "../../types";
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

interface PlayerBadgeProps {
  player: PlayerPublic;
}

export const PlayerBadge: FC<PlayerBadgeProps> = ({ player }) => {
  if (!player.actionRole) return <></>;
  if (player.actionRole === "loser") return <LoserBadge />;
  return <WinnerBadge />;
};
