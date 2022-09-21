import { FC } from "react";

import { LobbyPlayer } from "../../components/lobby-player";
import { Players } from "../../service/fake-players";
import {
  GameName,
  LobbyContainer,
  LobbyHorizontalLine,
  LobbyHorizontalLineInitial,
  LobbyLineContainer,
  LobbyVerticalLine,
  LobbyWrapper,
  WaitForOthersContainer,
  WaitingText,
} from "./styles";

export const Lobby: FC = () => {
  return (
    <LobbyContainer>
      <LobbyLineContainer>
        <LobbyHorizontalLineInitial />
        <LobbyHorizontalLine />
        <LobbyHorizontalLine />
        <LobbyHorizontalLineInitial />
      </LobbyLineContainer>
      <LobbyWrapper>
        {Players.map((player) => (
          <LobbyPlayer key={player.id} player={player} />
        ))}
      </LobbyWrapper>
      <LobbyLineContainer>
        <LobbyHorizontalLineInitial />
        <LobbyHorizontalLine />
        <LobbyHorizontalLine />
        <WaitForOthersContainer>
          <WaitingText>{"Waiting for the other to join..."}</WaitingText>
        </WaitForOthersContainer>
      </LobbyLineContainer>
      <GameName>{"liar's dice"}</GameName>
    </LobbyContainer>
  );
};
