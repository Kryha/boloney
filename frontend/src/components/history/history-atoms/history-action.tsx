import { FC, ReactNode } from "react";
import { text } from "../../../assets";
import { color, margins } from "../../../design";
import { HistoryRoundPlayer, PlayerPublic } from "../../../types";
import { getDieColor } from "../../../util";
import { GeneralText } from "../../atoms";
import { WinnerBadge, LoserBadge } from "../../badges";
import { Die } from "../../die";
import { PowerUpIcon } from "../../icons";
import { DiceIconWrapper, Lightning } from "../../icons/styles";
import { MatchStateContainer } from "../../match-players-overview/styles";
import { EndOfRoundRow, HistoryActionWrapper, HistoryBadgeContainer, HistoryBadgeWrapper, InfoRow, TimeStamp, Username } from "./styles";

interface Props {
  headingOne: string;
  headingOneColor?: string;
  headingTwo?: ReactNode;
  headingTwoColor?: string;
  isDice?: boolean;
  diceAmount?: number;
  powerUpAmount?: number;
  isPowerUp?: boolean;
  faceColor?: string;
}

export const HistoryActionTitle: FC<Props> = ({
  headingOne,
  headingTwo,
  headingOneColor,
  headingTwoColor,
  isDice,
  powerUpAmount,
  diceAmount,
  isPowerUp,
  faceColor,
}) => {
  const textPowerUpAmount = powerUpAmount && powerUpAmount > 0 ? text.param.plusAmount(powerUpAmount) : powerUpAmount;

  return (
    <HistoryActionWrapper>
      <TimeStamp customColor={headingOneColor}>{text.param.appendColon(headingOne)}</TimeStamp>
      {!isDice && !isPowerUp && <TimeStamp customColor={headingTwoColor}>{headingTwo}</TimeStamp>}
      {isDice && (
        <InfoRow>
          <Die faceColor={faceColor} isMatchHistory={true} />
          <TimeStamp customColor={headingTwoColor}>{text.param.plusAmount(diceAmount || 0)}</TimeStamp>
        </InfoRow>
      )}
      {isPowerUp && (
        <InfoRow>
          <Lightning />
          <TimeStamp customColor={headingTwoColor}>{textPowerUpAmount}</TimeStamp>
        </InfoRow>
      )}
    </HistoryActionWrapper>
  );
};

interface OutcomeProps {
  outcome?: HistoryRoundPlayer;
  player: PlayerPublic;
}

export const HistoryOutcome: FC<OutcomeProps> = ({ outcome, player }) => {
  const amountResult = outcome?.isWinner
    ? text.param.xAmount(outcome.playerStats.diceAmount)
    : text.param.endOfTurnResult(outcome?.playerStats.diceAmount);
  const faceColor = getDieColor(player);

  return (
    <HistoryBadgeWrapper customBackground={color.greyWithOpacity}>
      <HistoryBadgeContainer isHeader>
        <Username>{text.param.usernameTitle(player.username, outcome?.isWinner)}</Username>
        <MatchStateContainer>
          <DiceIconWrapper>
            <Die size={margins.small4} faceColor={faceColor} />
            <GeneralText customColor={color.darkGrey}>{amountResult}</GeneralText>
          </DiceIconWrapper>
          <PowerUpIcon powerUpAmount={outcome?.playerStats.powerUpsAmount || 0} />
        </MatchStateContainer>
      </HistoryBadgeContainer>
      {outcome?.isWinner ? <WinnerBadge /> : <LoserBadge />}
    </HistoryBadgeWrapper>
  );
};

interface EndOfRoundHistoryListProps {
  playerName: string;
  diceAmount: number;
  powerUpAmount: number;
}

export const EndOfRoundHistoryList: FC<EndOfRoundHistoryListProps> = ({ playerName, diceAmount, powerUpAmount }) => {
  return (
    <EndOfRoundRow>
      <Username>{playerName}</Username>
      <GeneralText customColor={color.mediumGrey}>{text.param.diceAmount(diceAmount)}</GeneralText>
      <PowerUpIcon powerUpAmount={powerUpAmount} />
      <GeneralText customColor={color.mediumGrey}>{text.history.closingBracket}</GeneralText>
    </EndOfRoundRow>
  );
};
