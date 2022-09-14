import { FC } from "react";
import { Player } from "../../interfaces";
import { Heading4, Paragraph } from "../atoms";
import { Hands } from "../hand";
import { LobbyPlayerStatus } from "../lobby-player-status";
import { LobbyPlayerWrapper } from "./styles";

interface LobbyPlayerProps {
  player: Player;
}
// TODO: complete control component
export const LobbyPlayer: FC<LobbyPlayerProps> = ({ player }) => {
  return (
    <LobbyPlayerWrapper isWaiting={player.connected}>
      <Hands key={player.id} avatar={player.avatar} paint={player.paint} avatarName={player.avatarName} name={player.name} />
      <LobbyPlayerStatus playerName={player.name} isWaiting={player.connected} />
    </LobbyPlayerWrapper>
  );
};
