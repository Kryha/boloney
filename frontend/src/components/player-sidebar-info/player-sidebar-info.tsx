import { FC } from "react";
import { MAX_PLAYER_SIDEBAR_AMOUNT } from "../../constants";
import { Bid, PlayerPublic } from "../../types";
import { PlayerLastBid } from "../match-players-overview";
import { PlayerCheckboxProps } from "../power-up-checkbox/player-checkbox";
import { PlayerSidebarInfoContainer } from "./styles";

interface PlayerSidebarInfoProps {
  lastBid?: Bid;
  player: PlayerPublic;
  showLastBid: boolean;
  totalPlayers: number;
  targetPlayerId?: string;
  isPowerUpInUse: boolean;
}

export const PlayerSidebarInfo: FC<PlayerSidebarInfoProps> = ({
  lastBid,
  player,
  showLastBid,
  totalPlayers,
  targetPlayerId,
  isPowerUpInUse,
}) => {
  return (
    <PlayerSidebarInfoContainer
      isLastBid={showLastBid}
      isPowerUpInUse={isPowerUpInUse}
      isTotalPlayers={totalPlayers === MAX_PLAYER_SIDEBAR_AMOUNT}
    >
      {showLastBid && <PlayerLastBid lastBid={lastBid} player={player} />}
      <PlayerCheckboxProps userId={player.userId} targetPlayerId={targetPlayerId} />
    </PlayerSidebarInfoContainer>
  );
};
