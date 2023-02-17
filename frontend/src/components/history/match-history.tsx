import { FC } from "react";
import { HistoryEvent, PlayerPublic } from "../../types";
import { HistoryBadgeBid } from "./history-atoms/history-badge";
import { HistoryEndOfRound } from "./history-atoms/history-end-of-round";
import { HistoryAction } from "./history-atoms/history-info";
import { RoundBadge } from "./history-atoms/round-badge";

interface Props {
  historyEvents: HistoryEvent[];
  players: Record<string, PlayerPublic>;
}

interface HistoryListProps {
  historyEvent: HistoryEvent;
  players: Record<string, PlayerPublic>;
}

export const HistoryListItem: FC<HistoryListProps> = ({ historyEvent, players }) => {
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
        return <HistoryEndOfRound endOfRound={historyEvent} players={players} />;
    }
  };
  return <>{historyView()}</>;
};

export const MatchHistoryComponent: FC<Props> = ({ historyEvents, players }) => {
  if (!historyEvents) return <></>;

  return (
    <>
      {historyEvents.map((historyEvent, index) => (
        <HistoryListItem historyEvent={historyEvent} key={index} players={players} />
      ))}
    </>
  );
};
