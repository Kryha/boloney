import { FC } from "react";
import { PlayerPublic } from "../../types";
import { LobbyHands } from "../lobby-lineup";
import { PlayerLineupWrapper } from "./styles";

interface Props {
  players: PlayerPublic[];
}

/**
 *
 * This is the component for displaying players in the lobby to display their avatars.
 * @param {PlayerPublic} players - This is an array of the players in the lobby
 */

export const PlayerLineup: FC<Props> = ({ players }) => {
  return (
    <PlayerLineupWrapper>
      <LobbyHands players={players} />
    </PlayerLineupWrapper>
  );
};
