import { FC } from "react";
import { text } from "../../../assets";
import { color } from "../../../design";
import { PlayerInfoText, TimeStamp } from "../../../atoms";
import { HistoryPlayerAction, PlayerPublic, powerUpIdSchema } from "../../../types";
import { getPowerUp, parseTimeFormat, getDieColor } from "../../../util";
import { HistoryActionTitle } from "./history-action";
import { HistoryBadgeContainer, HistoryBadgeWrapper, HistoryDivider, TimerRow } from "./styles";

interface Props {
  playerAction: HistoryPlayerAction;
  player?: PlayerPublic;
}

/**
 * Power-ups are matched to their ID in the following way:
 * 1. Grill
 * 2. Bird's Eye View
 * 3. Ménage à Troìs
 * 4. Double Up
 * 5. Vendetta
 * 6. Second Chance
 * 7. Coup
 * 8. Smoke and Mirrors
 * 9. Hypnosis
 */
export const HistoryAction: FC<Props> = ({ playerAction, player }) => {
  const headingOne = playerAction.actionName === "healDice" ? text.history.action : text.history.powerUp;
  const headingTwo = playerAction.targetPlayerName ? text.history.target : text.history.outcome;

  let isDice, isPowerUp, diceAmount, powerUpAmount, actionName, outcome;

  outcome = playerAction.outcome;
  const powerUpId = powerUpIdSchema.safeParse(playerAction.actionName);

  if (powerUpId.success) {
    const powerUp = getPowerUp(powerUpId.data);
    if (powerUp?.id === "3") {
      isDice = true;
      diceAmount = parseInt(playerAction.outcome || "0");
    }
    if (powerUp?.id === "4") {
      isPowerUp = true;
      powerUpAmount = parseInt(playerAction.outcome || "0");
    }
    actionName = powerUp?.name;

    if (powerUp?.id === "6") outcome = text.history.outcomeSecondChance;

    if (powerUp?.id === "8") outcome = text.history.outcomeSmokeAndMirrors;
  }

  if (playerAction.actionName === "healDice") {
    isDice = true;
    diceAmount = 1;
    actionName = text.playerTurn.healDice;
  }
  const headingTwoDetails = playerAction.targetPlayerName ? playerAction.targetPlayerName : outcome;
  const iconColor = player && getDieColor(player);

  return (
    <>
      <HistoryBadgeWrapper>
        <HistoryBadgeContainer isHeader>
          <TimerRow>
            <PlayerInfoText>{playerAction.activePlayerName}</PlayerInfoText>
            <TimeStamp customcolor={color.mediumGrey}>{parseTimeFormat(playerAction.createdAt)}</TimeStamp>
          </TimerRow>
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
      <HistoryDivider />
    </>
  );
};
