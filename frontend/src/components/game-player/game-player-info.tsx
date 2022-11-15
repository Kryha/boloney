import { FC } from "react";

import { PlayerPublic } from "../../types";
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
  return (
    <GameStateContainer>
      <DiceIcon diceAmount={player.diceAmount} />
      <PowerUpIcon powerUpAmount={player.powerUpsAmount} />
    </GameStateContainer>
  );
};
