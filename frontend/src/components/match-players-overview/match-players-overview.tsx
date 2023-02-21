import { FC, useEffect } from "react";

import { MatchPlayersOverviewWrapper } from "./styles";
import { useStore } from "../../store";
import { MatchPlayer } from "./match-player";
import { MatchWinner } from "./match-winner";
import { useLocalPlayer } from "../../service";
import { PlayerPublic } from "../../types";

interface MatchPlayersOverviewProps {
  playerOrder: PlayerPublic[];
}

export const MatchPlayersOverview: FC<MatchPlayersOverviewProps> = ({ playerOrder }) => {
  const matchStage = useStore((state) => state.matchStage);
  const leaderboard = useStore((state) => state.leaderboard);
  const localPlayer = useLocalPlayer();
  const isShuffling = useStore((state) => state.isShufflingPlayers);
  const setShuffling = useStore((state) => state.setShufflingPlayers);
  const isEndOfMatch = matchStage === "endOfMatchStage";

  useEffect(() => {
    setTimeout(() => {
      if (isShuffling) setShuffling(false);
    }, 1500);
  }, [isShuffling, setShuffling]);

  const winner = leaderboard.at(0);

  const isWinner = localPlayer?.actionRole === "winner";
  const areDeadPlayers = playerOrder.map((player) => player.status === "lost");

  return (
    <MatchPlayersOverviewWrapper
      isWinner={isWinner}
      isShuffling={isShuffling}
      isOnePlayer={playerOrder.length === 1}
      isEndOfMatch={isEndOfMatch}
      areDeadPlayers={areDeadPlayers}
    >
      {isEndOfMatch ? (
        <MatchWinner player={winner} />
      ) : (
        playerOrder.map((player) => <MatchPlayer key={player.userId} player={player} totalPlayers={playerOrder.length} />)
      )}
    </MatchPlayersOverviewWrapper>
  );
};
