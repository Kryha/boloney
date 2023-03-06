import { FC } from "react";
import { HistoryEvent, PlayerPublic } from "../../types";
import { HistoryBadgeBid } from "./history-atoms/history-badge";
import { HistoryEndOfRound } from "./history-atoms/history-end-of-round";
import { HistoryAction } from "./history-atoms/history-info";
import { RoundBadge } from "./history-atoms/round-badge";

interface Props {
  historyEvents: HistoryEvent[];
  players: Record<string, PlayerPublic>;
  localPlayer: PlayerPublic;
}

interface HistoryListProps {
  historyEvent: HistoryEvent;
  players: Record<string, PlayerPublic>;
  localPlayer: PlayerPublic;
}

export const HistoryListItem: FC<HistoryListProps> = ({ historyEvent, players, localPlayer }) => {
  const historyView = () => {
    switch (historyEvent.eventType) {
      case "bidAction":
        return <HistoryBadgeBid historyBid={historyEvent} />;
      case "playerAction":
        return (
          <HistoryAction
            playerAction={historyEvent}
            player={Object.values(players).find((player) => player.username === historyEvent.activePlayerName)}
          />
        );
      case "roundStart":
        return <RoundBadge roundStart={historyEvent} />;
      case "roundResults":
        return <HistoryEndOfRound endOfRound={historyEvent} players={players} localPlayer={localPlayer} />;
    }
  };
  return <>{historyView()}</>;
};

// TODO: This component is redundant and it can be refactored
export const MatchHistoryComponent: FC<Props> = ({ historyEvents, players, localPlayer }) => {
  if (!historyEvents) return <></>;

  return (
    <>
      {historyEvents.map((historyEvent, index) => (
        <HistoryListItem historyEvent={historyEvent} key={index} players={players} localPlayer={localPlayer} />
      ))}
    </>
  );
};
