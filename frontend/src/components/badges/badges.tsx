import { FC } from "react";

import { LockIcon, CoolHand, Crown, text, DeadCoffinIcon } from "../../assets";
import { Action, PlayerPublic } from "../../types";
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

const TimeOutBadge = () => {
  return (
    <BadgeWrapper>
      <CoolHand />
      <GeneralText>{text.playerTurn.outOfTime}</GeneralText>
    </BadgeWrapper>
  );
};

export const PlayerDeadBadge = () => {
  return (
    <BadgeWrapper>
      <DeadCoffinIcon />
      <GeneralText>{text.match.dead}</GeneralText>
    </BadgeWrapper>
  );
};

const PowerUpNotAvailable = () => {
  return (
    <BadgeWrapper>
      <LockIcon />
      <GeneralText>{text.playerTurn.availableNextRound}</GeneralText>
    </BadgeWrapper>
  );
};

export const PowerUpBadge: FC = () => {
  return <PowerUpNotAvailable />;
};

interface PlayerBadgeProps {
  player: PlayerPublic;
  lastAction: Action;
}

export const PlayerBadge: FC<PlayerBadgeProps> = ({ player, lastAction }) => {
  const isCallExact = lastAction === "Exact" && !player.isActive;
  if (!player.actionRole || isCallExact) return <></>;

  if (player.actionRole === "loser") return <LoserBadge />;
  if (player.actionRole === "timeOut") return <TimeOutBadge />;
  return <WinnerBadge />;
};
