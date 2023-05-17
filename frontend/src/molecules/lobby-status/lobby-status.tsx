import { FC } from "react";
import { text } from "../../assets";

import { Heading4, BodyText, EllipsisText } from "../../atoms";
import { LobbyStatusWrapper } from "./styles";

interface LobbyPlayerStatusProps {
  isWaiting: boolean;
  isReady: boolean;
  playerName: string;
}

/**
 *
 * This is the component for displaying the status of a player in the lobby.
 * @param {boolean} isWaiting - This is a boolean to signify if the player is waiting.
 * @param {boolean} isReady - This is a boolean to signify if the player is ready.
 * @param {boolean} playerName - This is the player's name.
 */

export const LobbyStatus: FC<LobbyPlayerStatusProps> = ({ isWaiting, isReady, playerName }) => {
  return (
    <LobbyStatusWrapper>
      <Heading4>{playerName} </Heading4>
      {isWaiting ? (
        <EllipsisText>{text.general.waiting} </EllipsisText>
      ) : (
        <BodyText>{isReady ? text.general.ready : text.general.connected}</BodyText>
      )}
    </LobbyStatusWrapper>
  );
};
