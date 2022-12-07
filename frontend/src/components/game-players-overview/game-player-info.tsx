import { FC } from "react";

import { Bid, PlayerPublic } from "../../types";
import { Heading6 } from "../atoms";
import { Die } from "../die";
import { getDieColor } from "../../util";
import { DiceIcon, PowerUpIcon } from "../icons";
import { PlayerNameContainer, PlayerColor, GameStateContainer, PlayerName as Name, DiceContainer } from "./styles";
import { text } from "../../assets";

interface PlayerNameProps {
  name: string;
  color: string;
}

export const PlayerName: FC<PlayerNameProps> = ({ name, color }) => {
  return (
    <PlayerNameContainer>
      <PlayerColor customColor={color} />
      <Name>{name}</Name>
    </PlayerNameContainer>
  );
};

interface PlayerGameStateProps {
  player: PlayerPublic;
}

export const PlayerGameState: FC<PlayerGameStateProps> = ({ player }) => {
  const dieColor = getDieColor(player);

  return (
    <GameStateContainer>
      <DiceIcon diceAmount={player.diceAmount} faceColor={dieColor} />
      <PowerUpIcon powerUpAmount={player.powerUpsAmount} />
    </GameStateContainer>
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
