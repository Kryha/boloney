import { FC } from "react";
import { text } from "../../assets";

import { LobbyPlayer } from "../../components/lobby-player";
import { Players } from "../../service/fake-players";
import {
  GameName,
  LobbyContainer,
  LobbyHorizontalLine,
  LobbyHorizontalLineInitial,
  LobbyLineContainer,
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
          <WaitingText>{text.general.waitingForTheOthersToJoin}</WaitingText>
        </WaitForOthersContainer>
      </LobbyLineContainer>
      <GameName>{text.general.appName}</GameName>
    </LobbyContainer>
  );
};
