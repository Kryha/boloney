import { FC } from "react";

import { Bid, PlayerPublic } from "../../types";
import { ChatUserName, Heading6 } from "../atoms";
import { Die } from "../die";
import { getDieColor } from "../../util";
import { DiceIcon, PowerUpIcon } from "../icons";
import { PlayerNameContainer, PlayerColor, MatchStateContainer, DiceContainer } from "./styles";
import { text } from "../../assets";

interface PlayerNameProps {
  name: string;
  color: string;
}

export const PlayerName: FC<PlayerNameProps> = ({ name, color }) => {
  return (
    <PlayerNameContainer>
      <PlayerColor customColor={color} />
      <ChatUserName>{name}</ChatUserName>
    </PlayerNameContainer>
  );
};

interface PlayerMatchStateProps {
  player: PlayerPublic;
}

export const PlayerMatchState: FC<PlayerMatchStateProps> = ({ player }) => {
  const dieColor = getDieColor(player);

  return (
    <MatchStateContainer>
      <DiceIcon diceAmount={player.diceAmount} faceColor={dieColor} />
      <PowerUpIcon powerUpAmount={player.powerUpsAmount} />
    </MatchStateContainer>
  );
};

interface PlayerLastBidProps {
  lastBid: Bid;
  player: PlayerPublic;
}

export const PlayerLastBid: FC<PlayerLastBidProps> = ({ lastBid, player }) => {
  const dieColor = getDieColor(player);

  return (
    <DiceContainer>
      <Heading6>{text.param.xAmount(lastBid.amount)}</Heading6>
      <Die faceColor={dieColor} value={lastBid.face} />
    </DiceContainer>
  );
};
