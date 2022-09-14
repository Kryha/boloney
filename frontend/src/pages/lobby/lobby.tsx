import { FC } from "react";

import { text } from "../../assets/text";
import {} from "../../components";
import { Hands } from "../../components/hand";
import { LobbyPlayer } from "../../components/lobby-player";
import { Players } from "../../service/fake-players";
import { GameName, LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  return (
    <LobbyWrapper>
      {Players.map((player) => (
        <LobbyPlayer key={player.id} player={player} />
      ))}
      <GameName>{"liar's dice"}</GameName>
    </LobbyWrapper>
  );
};
