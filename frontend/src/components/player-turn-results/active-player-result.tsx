import { FC } from "react";
import { text, ResultData } from "../../assets";
import { FADE_TRANSITION_DURATION } from "../../constants";

import { color } from "../../design";

import { ActionRole } from "../../types";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { ButtonReady } from "../button-ready";
import { FadeTransition } from "../page-transition";
import { ActivePlayerImage, ActivePlayerResultWrapper } from "./styles";
import { ActivePlayerTextResults } from "./text-results";
import { getActiveMargin } from "./util";

interface ActivePlayerResult {
  actionRole: ActionRole;
  isWinner: boolean;
  playerData: ResultData;
  isBoloney: boolean;
}

export const ActivePlayerResults: FC<ActivePlayerResult> = ({ actionRole, isWinner, playerData, isBoloney }) => {
  const actionImg = isWinner ? playerData.winnerImg : playerData.loserImg;
  const actionImgMargin = getActiveMargin(isBoloney, isWinner, false);

  const isTimeOut = actionRole === "timeOut";

  return (
    <ActivePlayerResultWrapper>
      <BottomButtonWrapper>
        {isTimeOut ? (
          <>
            <FadeTransition>
              <Heading1>{text.playerTurn.playerTimeOut}</Heading1>
              <Heading2 customColor={color.darkGrey}>{text.playerTurn.youRunOutOfTime}</Heading2>
            </FadeTransition>
            <FadeTransition delay={FADE_TRANSITION_DURATION}>
              <ActivePlayerImage src={playerData.loserImg} alt={playerData.name} isBoloney={isBoloney} actionImgMargin={actionImgMargin} />
            </FadeTransition>
          </>
        ) : (
          <>
            <FadeTransition>
              <ActivePlayerTextResults data={playerData} isWinner={isWinner} />
            </FadeTransition>
            <FadeTransition delay={FADE_TRANSITION_DURATION}>
              <ActivePlayerImage src={actionImg} alt={playerData.name} isBoloney={isBoloney} actionImgMargin={actionImgMargin} />
            </FadeTransition>
          </>
        )}
        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
