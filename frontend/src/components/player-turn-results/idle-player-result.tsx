import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { Action, PlayerPublic } from "../../types";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { ButtonReady } from "../button-ready";
import { TextResultWrapper } from "../player-turns/styles";

import { ActivePlayerResultWrapper } from "./styles";

interface IdlePlayerResultPayload {
  player: PlayerPublic;
  lastAction: Action;
  isActivePlayerWinner: boolean;
}

export const IdlePlayerResult: FC<IdlePlayerResultPayload> = ({ player, lastAction, isActivePlayerWinner }) => {
  const isTimeOut = lastAction === "lostByTimeOut";

  const congratulationsMessage = isActivePlayerWinner
    ? text.param.congratulationsIdlePlayerActiveWon(player.username, lastAction)
    : text.param.congratulationsIdlePlayerActiveLost(player.username, lastAction);

  return (
    <ActivePlayerResultWrapper>
      <BottomButtonWrapper>
        <TextResultWrapper>
          {isTimeOut ? (
            <>
              <Heading1>{text.playerTurn.playerTimeOut}</Heading1>
              <Heading2 customColor={color.darkGrey}>{text.param.aPlayerLostByTimeOut(player.username)}</Heading2>
            </>
          ) : (
            <>
              <Heading1>{text.playerTurn.weHaveAWinner}</Heading1>
              <Heading2 customColor={color.darkGrey}>{congratulationsMessage}</Heading2>
            </>
          )}
        </TextResultWrapper>

        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
