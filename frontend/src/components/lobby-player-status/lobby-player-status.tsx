import { FC } from "react";
import { Heading4, Paragraph } from "../atoms";
import { LobbyPlayerStatusWrapper, Waiting } from "./styles";

interface LobbyPlayerStatusProps {
  isWaiting: boolean;
  playerName: string;
}
// TODO: complete control component
export const LobbyPlayerStatus: FC<LobbyPlayerStatusProps> = ({ isWaiting, playerName }) => {
  return (
    <LobbyPlayerStatusWrapper isWaiting={isWaiting}>
      <Heading4>{playerName}</Heading4>
      {isWaiting ? <Waiting>{"waiting"}</Waiting> : <Paragraph>{"connected"}</Paragraph>}
    </LobbyPlayerStatusWrapper>
  );
};
