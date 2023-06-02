import { FC } from "react";
import { BaseRow, HistoryBadgeContainer, HistoryBadgeWrapper, HorizontalDivider, PlayerInfoText, TimeStamp } from "../../atoms";
import { color, containerWidth, spacing } from "../../design";
import { PlayerPublic } from "../../types";
import { parseTimeFormat } from "../../util";
import { HistoryActionTitle } from "./history-action";

interface Props {
  headingOne: string;
  headingTwo: string;
  headingTwoDetails: string;
  actionName: string;
  isDice: boolean;
  isPowerUp: boolean;
  powerUpAmount: number;
  diceAmount: number;
  iconColor: string;
  createdAt: number;

  player?: PlayerPublic;
}

/**
 * Molecule for history player action entry.
 * @param {headingOne} - Text of first heading
 * @param {headingTwo} - Text of second heading
 * @param {headingTwoDetails} - Details of second heading
 * @param {actionName} - Action name to be displayed
 * @param {isDice} - Is dice present
 * @param {isPowerUp} - Is powerUp present
 * @param {powerUpAmount} - Amount of power-ups
 * @param {diceAmount} - Number of dice
 * @param {iconColor} - Color of dice icon
 * @param {player} - The active player
 * @param {createdAt} - Action creation time
 */

export const HistoryAction: FC<Props> = ({
  headingOne,
  headingTwo,
  headingTwoDetails,
  actionName,
  isDice,
  isPowerUp,
  powerUpAmount,
  diceAmount,
  iconColor,
  player,
  createdAt,
}) => {
  return (
    <>
      <HistoryBadgeWrapper alignItems="flex-start" justifyContent="center">
        <HistoryBadgeContainer gap={spacing.xs}>
          <BaseRow alignItems="center" gap={spacing.xs}>
            <PlayerInfoText>{player?.username || ""}</PlayerInfoText>
            <TimeStamp customcolor={color.mediumGrey}>{parseTimeFormat(createdAt)}</TimeStamp>
          </BaseRow>
          <HistoryActionTitle
            headingOne={headingOne}
            headingOneColor={color.mediumGrey}
            headingTwo={actionName}
            headingTwoColor={color.darkGrey}
          />
          <HistoryActionTitle
            headingOne={headingTwo}
            headingOneColor={color.mediumGrey}
            headingTwo={headingTwoDetails}
            headingTwoColor={color.darkGrey}
            isDice={isDice}
            isPowerUp={isPowerUp}
            powerUpAmount={powerUpAmount}
            diceAmount={diceAmount}
            iconColor={iconColor}
          />
        </HistoryBadgeContainer>
      </HistoryBadgeWrapper>
      <HorizontalDivider width={containerWidth.md} customcolor={color.grey} />
    </>
  );
};
