import { FC } from "react";

import { PlayerPublic } from "../../types";
import { getDieColor } from "../../util";
import { DiceIcon, PowerUpIcon } from "../icons";
import { PlayerNameContainer, PlayerColor, GameStateContainer, PlayerName as Name } from "./styles";

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
