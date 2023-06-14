import { FC } from "react";
import { HistoryEvent, PlayerPublic } from "../../types";
import { HistoryListItem } from "./history-list-item";
import { MatchHistoryContainer } from "./styles";

interface MatchHistoryComponentProps {
  historyEvents?: HistoryEvent[];
  players?: Record<string, PlayerPublic>;
  localPlayer?: PlayerPublic;
}

export const MatchHistoryComponent: FC<MatchHistoryComponentProps> = ({ historyEvents, players, localPlayer }) => {
  if (!historyEvents || !players || !localPlayer) return <></>;

  return (
    <MatchHistoryContainer>
      {historyEvents.map((historyEvent, index) => (
        <HistoryListItem historyEvent={historyEvent} key={index} players={players} localPlayer={localPlayer} />
      ))}
    </MatchHistoryContainer>
  );
};
