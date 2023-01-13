import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { Action, PlayerPublic } from "../../types";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { ButtonReady } from "../button-ready";
import { ErrorView } from "../error-view";
import { TextResultWrapper } from "../player-turns/styles";

import { ActivePlayerResultWrapper } from "./styles";

interface IdlePLayerResultPayload {
  player?: PlayerPublic;
  lastAction: Action;
}

export const IdlePlayerResult: FC<IdlePLayerResultPayload> = ({ player, lastAction }) => {
  if (!player) return <ErrorView />;
  const isTimeOut = lastAction === "lostByTimeOut";

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
              <Heading2 customColor={color.darkGrey}>
                {text.param.congratulationsIdlePlayer(player.username, lastAction)}
              </Heading2>
            </>
          )}
        </TextResultWrapper>

        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
