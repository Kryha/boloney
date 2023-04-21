import { FC, useEffect } from "react";
import { ResultData } from "../../assets";
import { usePlaySound } from "../../hooks";
import { BottomButtonWrapper } from "../../atoms";
import { ButtonReady } from "../button-ready";
import { ActivePlayerImage, ActivePlayerResultWrapper } from "./styles";
import { TargetPlayerTextResults } from "./text-results";
import { getActiveMargin, getSound } from "./util";

interface IdleTargetPlayerResults {
  playerData: ResultData;
  isWinner: boolean;
  isBoloney: boolean;
}

export const TargetPlayerResult: FC<IdleTargetPlayerResults> = ({ playerData, isWinner, isBoloney }) => {
  const actionImgMargin = getActiveMargin(isBoloney, isWinner, false);
  const playSound = usePlaySound();

  useEffect(() => {
    playSound(getSound(isWinner));
  }, [playSound, isWinner]);

  return (
    <ActivePlayerResultWrapper>
      <BottomButtonWrapper>
        <TargetPlayerTextResults data={playerData} isWinner={isWinner} />
        <ActivePlayerImage
          src={isWinner ? playerData.winnerImg : playerData.loserImg}
          alt={playerData.name}
          isBoloney={isBoloney}
          actionImgMargin={actionImgMargin}
        />
        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
