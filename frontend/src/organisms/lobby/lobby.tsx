import { FC, MouseEvent, useState } from "react";

import { text } from "../../assets";
import { BodyText, BoxPattern, RectanglePattern } from "../../atoms";
import { PrimaryButton } from "../../molecules";
import { PlayerLineup } from "../../molecules/player-lineup";
import { sendMessage, useChat, useMatch, useOrderedPlayers, useTotalDiceInMatch } from "../../service";
import { useStore } from "../../store";
import { MatchNavigationBar, MatchOptionsBar } from "../navigation-bar";
import { PlayerLogo } from "../player-logo";
import { LobbyWaitingContainer, LobbyWaitingWrapper } from "./styles";

export const Lobby: FC = () => {
  const { broadcastPlayerReady } = useMatch();
  const setPlayerReady = useStore((state) => state.setPlayerReady);
  const isPlayerReady = useStore((state) => state.isPlayerReady);
  const totalDice = useTotalDiceInMatch();
  const stageNumber = useStore((state) => state.stageNumber);
  const drawRoundCounter = useStore((state) => state.drawRoundCounter);
  const channelId = useStore((state) => state.channelId);
  const [messageInput, setMessageInput] = useState("");
  const messages = useChat();

  const players = useOrderedPlayers();

  const handleClick = async () => {
    await broadcastPlayerReady();
    setPlayerReady(true);
  };

  const handleSendEvent = (e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.currentTarget.value === "") return;
    sendMessage(channelId, e.currentTarget.value);
    setMessageInput("");
  };

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendEvent(e);
  };

  return (
    <>
      <MatchOptionsBar totalDice={totalDice} stageNumber={stageNumber} drawNumber={drawRoundCounter} />
      <MatchNavigationBar />
      <BoxPattern />
      <PlayerLineup players={players} />
      <RectanglePattern>
        <LobbyWaitingWrapper justifyContent="center" alignItems="center">
          {isPlayerReady ? (
            <LobbyWaitingContainer justifyContent="center" alignItems="center">
              <BodyText>{text.general.waitingForTheOthersToBeReady}</BodyText>
            </LobbyWaitingContainer>
          ) : (
            <PrimaryButton primaryText={text.general.imReady} onClick={handleClick} />
          )}
        </LobbyWaitingWrapper>
      </RectanglePattern>
      <PlayerLogo
        handleKeyEvent={handleKeyEvent}
        setMessageInput={setMessageInput}
        messageInput={messageInput}
        messages={messages}
        channelId={channelId}
      />
    </>
  );
};
