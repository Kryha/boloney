import { FC } from "react";
import { text } from "../../assets";

import { Heading4, Paragraph } from "../atoms";
import { LobbyPlayerStatusWrapper, Waiting } from "./styles";

interface LobbyPlayerStatusProps {
  isWaiting: boolean;
  isReady: boolean;
  playerName: string;
}

export const LobbyPlayerStatus: FC<LobbyPlayerStatusProps> = ({ isWaiting, isReady, playerName }) => {
  return (
    <LobbyPlayerStatusWrapper>
      <Heading4>{playerName} </Heading4>
      {isWaiting ? (
        <Waiting>{text.general.waiting} </Waiting>
      ) : (
        <Paragraph>{isReady ? text.general.ready : text.general.connected}</Paragraph>
      )}
    </LobbyPlayerStatusWrapper>
  );
};
