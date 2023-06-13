import { FC } from "react";

import { text, CrownSVG, CoolHandSVG, LockIconSVG, DeadCoffinIconSVG } from "../../assets";
import { Action, PlayerPublic } from "../../types";
import { Badge } from "../badges";

export const WinnerBadge = () => {
  return <Badge icon={<CrownSVG />} text={text.playerTurn.winner} />;
};

export const LoserBadge = () => {
  return <Badge icon={<CoolHandSVG />} text={text.playerTurn.loser} />;
};

const TimeOutBadge = () => {
  return <Badge icon={<CoolHandSVG />} text={text.playerTurn.outOfTime} />;
};

export const PlayerDeadBadge = () => {
  return <Badge icon={<DeadCoffinIconSVG />} text={text.match.dead} />;
};

export const PowerUpBadge: FC = () => {
  return <Badge icon={<LockIconSVG />} text={text.playerTurn.availableNextRound} />;
};

interface PlayerBadgeProps {
  player: PlayerPublic;
  lastAction: Action;
}

/**
 *
 * This is the component for displaying badges through out the match.
 * @param {PlayerPublic} player - This is a player within the match
 * @param {boolean} lastAction - The last action played, i.e Exact or boloney
 */

export const PlayerBadge: FC<PlayerBadgeProps> = ({ player, lastAction }) => {
  const isCallExact = lastAction === "Exact" && !player.isActive;
  if (!player.actionRole || isCallExact) return <></>;

  if (player.actionRole === "loser") return <LoserBadge />;
  if (player.actionRole === "timeOut") return <TimeOutBadge />;
  return <WinnerBadge />;
};
