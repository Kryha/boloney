import { FC } from "react";
import { text, ResultData } from "../../assets";

import { color } from "../../design";

import { ActionRole } from "../../types";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { ButtonReady } from "../button-ready";
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
            <Heading1>{text.playerTurn.playerTimeOut}</Heading1>
            <Heading2 customColor={color.darkGrey}>{text.playerTurn.youRunOutOfTime}</Heading2>
            <ActivePlayerImage src={playerData.loserImg} alt={playerData.name} isBoloney={isBoloney} actionImgMargin={actionImgMargin} />
          </>
        ) : (
          <>
            <ActivePlayerTextResults data={playerData} isWinner={isWinner} />
            <ActivePlayerImage src={actionImg} alt={playerData.name} isBoloney={isBoloney} actionImgMargin={actionImgMargin} />
          </>
        )}
        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
