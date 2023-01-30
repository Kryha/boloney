import { FC } from "react";

import { MatchPlayersOverviewWrapper } from "./styles";
import { useStore } from "../../store";
import { MatchPlayer } from "./match-player";
import { MatchWinner } from "./match-winner";
import { useArrangedPlayers, useLocalPlayer } from "../../service";

export const MatchPlayersOverview: FC = () => {
  const matchStage = useStore((state) => state.matchStage);
  const leaderboard = useStore((state) => state.leaderboard);
  const localPlayer = useLocalPlayer();
  const arrangedPlayers = useArrangedPlayers();

  // TODO: get actual value
  const isShuffling = false;
  const winner = leaderboard.at(0);

  const isWinner = localPlayer?.actionRole === "winner";

  return (
    <MatchPlayersOverviewWrapper isWinner={isWinner} isShuffling={isShuffling} isOnePlayer={arrangedPlayers.length === 1}>
      {matchStage === "endOfMatchStage" ? (
        <MatchWinner player={winner} />
      ) : (
        arrangedPlayers.map((player) => <MatchPlayer key={player.userId} player={player} totalPlayers={arrangedPlayers.length} />)
      )}
    </MatchPlayersOverviewWrapper>
  );
};
