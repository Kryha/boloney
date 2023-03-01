import { FC } from "react";

import { MAX_PLAYER_SIDEBAR_AMOUNT } from "../../constants";
import { BidWithUserId, PlayerPublic } from "../../types";
import { PlayerLastBid } from "../match-players-overview";
import { RadioButton } from "../power-up-checkbox";
import { PlayerSidebarInfoContainer } from "./styles";

interface PlayerSidebarInfoProps {
  player: PlayerPublic;
  lastBid?: BidWithUserId;
  totalPlayers: number;
  hasRadioButton?: boolean;
  isChecked?: boolean;
  onSelect: () => void;
}

export const PlayerSidebarInfo: FC<PlayerSidebarInfoProps> = ({
  player,
  lastBid,
  totalPlayers,
  hasRadioButton,
  isChecked = false,
  onSelect,
}) => {
  return (
    <PlayerSidebarInfoContainer isLastBid={lastBid?.userId === player.userId} isTotalPlayers={totalPlayers === MAX_PLAYER_SIDEBAR_AMOUNT}>
      {!!lastBid && <PlayerLastBid lastBid={lastBid} player={player} />}
      {hasRadioButton && <RadioButton isDisabled={hasRadioButton} onSelect={onSelect} isChecked={isChecked} />}
    </PlayerSidebarInfoContainer>
  );
};
