import { FC } from "react";

import { Bid, PlayerPublic, PowerUpId, PlayerRoundData } from "../../types";
import { ChatUserName, Heading6 } from "../../atoms";
import { Die } from "../die";
import { getDieColor } from "../../util";
import { DiceIcon, PowerUpIcon } from "../icons";
import { PlayerNameContainer, PlayerColor, MatchStateContainer, DiceContainer } from "./styles";
import { text } from "../../assets";
import { color, iconSize } from "../../design";

interface PlayerNameProps {
  name: string;
  color: string;
}

export const PlayerName: FC<PlayerNameProps> = ({ name, color }) => {
  return (
    <PlayerNameContainer>
      <PlayerColor customcolor={color} />
      <ChatUserName>{name}</ChatUserName>
    </PlayerNameContainer>
  );
};

interface PlayerMatchStateProps {
  player: PlayerPublic;
  playerRoundData?: PlayerRoundData;
  powerUpIds?: PowerUpId[];
}

export const PlayerMatchState: FC<PlayerMatchStateProps> = ({ player, playerRoundData }) => {
  const dieColor = getDieColor(player);

  return (
    <MatchStateContainer>
      <DiceIcon diceAmount={player.diceAmount} iconColor={dieColor} diceSum={playerRoundData?.diceSum} extraDice={player.extraDice} />
      <PowerUpIcon
        powerUpAmount={player.powerUpsAmount}
        powerUpIds={playerRoundData?.powerUps}
        powerUpDisabled={player.arePowerUpsDisabled}
        strokeColor={color.darkGrey}
      />
    </MatchStateContainer>
  );
};

interface PlayerLastBidProps {
  lastBid?: Bid;
  player: PlayerPublic;
}

export const PlayerLastBid: FC<PlayerLastBidProps> = ({ lastBid, player }) => {
  if (player.diceAmount === 0 || !lastBid) return <></>;

  const dieColor = getDieColor(player);

  return (
    <DiceContainer>
      <Heading6 transformText="none">{text.param.xAmount(lastBid.amount)}</Heading6>
      <Die iconColor={dieColor} value={lastBid.face} size={iconSize.xs} />
    </DiceContainer>
  );
};
