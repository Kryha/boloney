import { FC } from "react";
import Highlighter from "react-highlight-words";
import { text } from "../../assets";
import { color } from "../../design";
import { Action, PlayerPublic } from "../../types";
import { BottomButtonWrapper, Heading1, Heading2 } from "../../atoms";
import { ButtonReady } from "../button-ready";
import { TextResultWrapper } from "../player-turns/styles";

import { ActivePlayerResultWrapper } from "./styles";

interface IdlePlayerResultPayload {
  player: PlayerPublic;
  lastAction: Action;
  isActivePlayerWinner: boolean;
  loser: PlayerPublic | undefined;
}

export const IdlePlayerResult: FC<IdlePlayerResultPayload> = ({ player, lastAction, isActivePlayerWinner, loser }) => {
  const isTimeOut = lastAction === "lostByTimeOut";

  const exactMessage = isActivePlayerWinner
    ? text.param.activeWasRightExact(player.username)
    : text.param.activeWasWrongExact(loser?.username || "");

  const boloneyMessage = text.param.idleBoloney(player.username, loser?.username || "");
  const congratulationsMessage = lastAction === "Boloney" ? boloneyMessage : exactMessage;

  return (
    <ActivePlayerResultWrapper>
      <BottomButtonWrapper>
        <TextResultWrapper>
          {isTimeOut ? (
            <>
              <Heading1>{text.playerTurn.playerTimeOut}</Heading1>
              <Heading2 customcolor={color.darkGrey}>
                <Highlighter
                  highlightClassName="bold"
                  searchWords={[player.username]}
                  autoEscape
                  textToHighlight={text.param.aPlayerLostByTimeOut(player.username)}
                />
              </Heading2>
            </>
          ) : (
            <>
              <Heading1>{text.playerTurn.roundEnded}</Heading1>
              <Heading2 customcolor={color.darkGrey}>
                <Highlighter
                  highlightClassName="bold"
                  searchWords={[player.username, loser?.username || ""]}
                  autoEscape
                  textToHighlight={congratulationsMessage}
                />
              </Heading2>
            </>
          )}
        </TextResultWrapper>

        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
