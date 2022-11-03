import { FC } from "react";
import { Player } from "../../types";
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
  player: Player;
}

export const PlayerGameState: FC<PlayerGameStateProps> = ({ player }) => {
  // TODO: add to player object dice + power ups
  return (
    <GameStateContainer>
      <DiceIcon diceAmount={4} />
      <PowerUpIcon powerUpAmount={1} />
    </GameStateContainer>
  );
};
