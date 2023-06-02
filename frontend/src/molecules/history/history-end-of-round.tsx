import { FC } from "react";
import { text } from "../../assets";
import {
  BaseRow,
  EndOfRoundHistoryListWrapper,
  EndOfRoundRow,
  GeneralText,
  Heading6,
  HistoryBadgeContainer,
  HistoryBadgeWrapper,
  HorizontalDivider,
  PlayerInfoText,
  TimeStamp,
  VerticalDivider,
} from "../../atoms";
import { color, containerWidth, spacing } from "../../design";
import { HistoryPlayerStats, HistoryRoundResults, PlayerPublic } from "../../types";
import { getNumberWithOrdinal, parseTimeFormat } from "../../util";
import { Die } from "../die";
import { PowerUpIcon } from "../icons";
import { HistoryActionTitle } from "./history-action";
import { HistoryOutcome } from "./history-outcome";

const getDiceValues = (stats: HistoryPlayerStats) => stats.diceValue?.map((dice) => dice.rolledValue).sort((a, b) => a - b);

export interface HistoryEndOfRoundProps {
  endOfRound: HistoryRoundResults;
  players: Record<string, PlayerPublic>;
  actionName: string;
  isLocalPlayer: boolean;
  amountResultWinner?: string;
  amountResultLoser?: string;
  isPlayerDead?: boolean;
}

/**
 * Molecule for history end of round entry.
 * @param {endOfRound} - End of round data
 * @param {players} - Players in the game
 * @param {actionName} - Action name to be displayed
 * @param {isLocalPlayer} - Is local player
 * @param {amountResultWinner} - Amount result for winner
 * @param {amountResultLoser} - Amount result for loser
 * @param {isPlayerDead} - If the player is dead
 */

export const HistoryEndOfRound: FC<HistoryEndOfRoundProps> = ({
  endOfRound,
  players,
  actionName,
  isLocalPlayer,
  amountResultWinner,
  amountResultLoser,
  isPlayerDead,
}) => {
  return (
    <HistoryBadgeWrapper customBackground={color.cloudWhite} alignItems="flex-start" justifyContent="center">
      <HistoryBadgeContainer gap={spacing.xs}>
        <BaseRow alignItems="center" gap={spacing.xs}>
          <Heading6>{text.param.endOfRoundOrdinal(getNumberWithOrdinal(endOfRound.roundEnd.roundNumber))}</Heading6>
          <VerticalDivider height={spacing.sm} />
          <TimeStamp customcolor={color.mediumGrey}>{parseTimeFormat(endOfRound.roundEnd.createdAt)}</TimeStamp>
        </BaseRow>
        <HistoryActionTitle
          headingOne={text.history.action}
          headingOneColor={color.mediumGrey}
          headingTwo={actionName}
          headingTwoColor={color.black}
        />
      </HistoryBadgeContainer>
      {endOfRound.roundWinner && (
        <>
          <HorizontalDivider width={containerWidth.md} customcolor={color.grey} />
          <HistoryOutcome
            outcome={endOfRound.roundWinner}
            player={players[endOfRound.roundWinner.playerStats.userId]}
            isLocalPlayer={isLocalPlayer}
            amountResult={amountResultWinner}
            isPlayerDead={isPlayerDead}
          />
        </>
      )}
      {endOfRound.roundLoser && (
        <>
          <HorizontalDivider width={containerWidth.md} customcolor={color.grey} />
          <HistoryOutcome
            outcome={endOfRound.roundLoser}
            player={players[endOfRound.roundLoser.playerStats.userId]}
            isLocalPlayer={isLocalPlayer}
            amountResult={amountResultLoser}
            isPlayerDead={isPlayerDead}
          />
        </>
      )}
      <HorizontalDivider width={containerWidth.md} customcolor={color.grey} />
      <EndOfRoundHistoryListWrapper justifyContent="center" alignItems="flex-start" padding={`${spacing.xs} 0px 0px`}>
        {endOfRound.roundStats.map((stats, index) => (
          <>
            <EndOfRoundHistoryList
              playerName={players[stats.userId].username}
              powerUpAmount={stats.powerUpsAmount}
              key={index}
              diceValues={getDiceValues(stats)}
            />
            <HorizontalDivider width={containerWidth.md} customcolor={color.grey} />
          </>
        ))}
      </EndOfRoundHistoryListWrapper>
    </HistoryBadgeWrapper>
  );
};

interface EndOfRoundHistoryListProps {
  playerName: string;
  powerUpAmount: number;
  diceValues?: number[];
}

/**
 * @param {playerName} - Name of the player
 * @param {powerUpAmount} - Amount of power-ups
 * @param {diceValues} - Dice values
 */

export const EndOfRoundHistoryList: FC<EndOfRoundHistoryListProps> = ({ playerName, powerUpAmount, diceValues }) => {
  return (
    <EndOfRoundRow alignItems="center" gap={spacing.xs} padding={`${spacing.xs} ${spacing.s}`}>
      <PlayerInfoText>{playerName}</PlayerInfoText>
      <Die dieColor={color.transparent} pipColor={color.darkGrey} borderColor={color.darkGrey} />
      <GeneralText customcolor={color.darkGrey}>{text.param.playerDice(diceValues)}</GeneralText>
      <PowerUpIcon powerUpAmount={powerUpAmount} />
    </EndOfRoundRow>
  );
};
