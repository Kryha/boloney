import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { HistoryEvent, PlayerPublic, powerUpIdSchema } from "../../types";
import { getDieColor, getPowerUp } from "../../util";
import { HistoryAction, HistoryBadgeBid, HistoryEndOfRound, RoundBadge } from "../../molecules";

interface HistoryListProps {
  historyEvent: HistoryEvent;
  players: Record<string, PlayerPublic>;
  localPlayer: PlayerPublic;
}

//TODO: refactor the component to make it more readable and maintainable
export const HistoryListItem: FC<HistoryListProps> = ({ historyEvent, players, localPlayer }) => {
  let isLocalPlayer = false,
    actionName = "",
    headingOne = "",
    headingTwo = "",
    headingTwoDetails = "",
    powerUpId,
    powerUpAmount = 0,
    diceAmount = 0,
    isPowerUp = false,
    isDice = false,
    iconColor,
    outcome,
    amountResultWinner,
    amountResultLoser,
    isPlayerDead,
    player;

  const historyView = () => {
    switch (historyEvent.eventType) {
      case "bidAction":
        iconColor = getDieColor(players[historyEvent.userId]);
        return <HistoryBadgeBid historyBid={historyEvent} player={players[historyEvent.userId]} dieColor={iconColor} />;
      case "playerAction":
        headingOne = historyEvent.actionName === "healDice" ? text.history.action : text.history.powerUp;
        headingTwo = historyEvent.targetPlayerName ? text.history.target : text.history.outcome;

        outcome = historyEvent.outcome;
        powerUpId = powerUpIdSchema.safeParse(historyEvent.actionName);

        if (powerUpId.success) {
          const powerUp = getPowerUp(powerUpId.data);
          if (powerUp?.id === "3") {
            isDice = true;
            diceAmount = parseInt(historyEvent.outcome || "0");
          }
          if (powerUp?.id === "4") {
            isPowerUp = true;
            powerUpAmount = parseInt(historyEvent.outcome || "0");
          }
          actionName = powerUp?.name ?? "";

          if (powerUp?.id === "6") outcome = text.history.outcomeSecondChance;

          if (powerUp?.id === "8") outcome = text.history.outcomeSmokeAndMirrors;
        }

        if (historyEvent.actionName === "healDice") {
          isDice = true;
          diceAmount = 1;
          actionName = text.playerTurn.healDice;
        }

        headingTwoDetails = historyEvent.targetPlayerName ? historyEvent.targetPlayerName : outcome || "";
        player = Object.values(players).find((player) => player.username === historyEvent.activePlayerName);
        iconColor = (player && getDieColor(player)) || color.darkBlue;

        return (
          <HistoryAction
            headingOne={headingOne}
            headingTwo={headingTwo}
            headingTwoDetails={headingTwoDetails}
            isPowerUp={isPowerUp}
            isDice={isDice}
            iconColor={iconColor}
            powerUpAmount={powerUpAmount}
            diceAmount={diceAmount}
            actionName={actionName}
            createdAt={historyEvent.createdAt}
            player={player}
          />
        );
      case "roundStart":
        return <RoundBadge roundStart={historyEvent} />;
      case "roundResults":
        isLocalPlayer = historyEvent.roundWinner?.playerStats.userId === localPlayer.userId;

        switch (historyEvent.roundEnd.actionName) {
          case "boloney":
          case "exact":
            actionName = historyEvent.roundEnd.actionName;
            break;
          case "lostByTimeOut":
            actionName = text.history.lostByTimeout;
            break;
          case "leftMatch":
            actionName = text.history.playerLeft;
            break;
        }
        player = players[historyEvent.roundWinner?.playerStats.userId || 0];
        amountResultWinner =
          historyEvent.roundWinner?.isWinner || actionName === "leftMatch"
            ? text.param.xAmount(historyEvent.roundWinner?.playerStats.diceAmount)
            : text.param.endOfTurnResult(historyEvent.roundWinner?.playerStats.diceAmount);
        amountResultLoser =
          historyEvent.roundLoser?.isWinner || actionName === "leftMatch"
            ? text.param.xAmount(historyEvent.roundLoser?.playerStats.diceAmount)
            : text.param.endOfTurnResult(historyEvent.roundLoser?.playerStats.diceAmount);
        isPlayerDead = player.status === "lost" && actionName === "leftMatch";
        return (
          <HistoryEndOfRound
            endOfRound={historyEvent}
            players={players}
            actionName={actionName}
            isLocalPlayer={isLocalPlayer}
            amountResultLoser={amountResultLoser}
            amountResultWinner={amountResultWinner}
            isPlayerDead={isPlayerDead}
          />
        );
    }
  };
  return <>{historyView()} </>;
};
