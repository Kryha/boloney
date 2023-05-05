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
  isDisabled?: boolean;
  onSelect: () => void;
  isTargetable?: boolean;
}

export const PlayerSidebarInfo: FC<PlayerSidebarInfoProps> = ({
  player,
  lastBid,
  totalPlayers,
  hasRadioButton,
  isTargetable,
  isDisabled = false,
  isChecked = false,
  onSelect,
}) => {
  const isLastBid = lastBid?.userId === player.userId;

  return (
    <PlayerSidebarInfoContainer
      isLastBid={isLastBid}
      isTotalPlayers={totalPlayers === MAX_PLAYER_SIDEBAR_AMOUNT}
      isTargetable={isTargetable}
    >
      {!!lastBid && isLastBid && <PlayerLastBid lastBid={lastBid} player={player} />}
      {hasRadioButton && <RadioButton isDisabled={isDisabled} onSelect={onSelect} isChecked={isChecked} />}
    </PlayerSidebarInfoContainer>
  );
};
