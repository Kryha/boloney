import { FC } from "react";
import { PlayerPublic } from "../../types";
import { LobbyPlayer } from "../lobby-player";
import { LobbyLineup } from "./styles";

interface Props {
  players: PlayerPublic[];
}

/**
 *
 * This is the component for displaying players in the lobby to display their avatars.
 * @param {PlayerPublic} players - This is an array of the players in the lobby
 */

export const LobbyHands: FC<Props> = ({ players }) => {
  return (
    <LobbyLineup alignItems="center" justifyContent="center">
      {players.map((player) => (
        <LobbyPlayer player={player} key={player.userId} totalPlayers={players.length} />
      ))}
    </LobbyLineup>
  );
};
