import { FC } from "react";
import { text } from "../../assets";

import { Heading4, Paragraph } from "../atoms";
import { LobbyPlayerStatusWrapper, Waiting } from "./styles";

interface LobbyPlayerStatusProps {
  isWaiting: boolean;
  playerName: string;
}

export const LobbyPlayerStatus: FC<LobbyPlayerStatusProps> = ({ isWaiting, playerName }) => {
  return (
    <LobbyPlayerStatusWrapper>
      <Heading4>{playerName} </Heading4>
      {isWaiting ? <Waiting>{text.general.waiting} </Waiting> : <Paragraph>{text.general.connected}</Paragraph>}
    </LobbyPlayerStatusWrapper>
  );
};
