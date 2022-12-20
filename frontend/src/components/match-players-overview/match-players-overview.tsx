import { FC } from "react";

import { MatchPlayersOverviewWrapper } from "./styles";
import { useStore } from "../../store";
import { MatchPlayer } from "./match-player";
import { MatchWinner } from "./match-winner";
import { useRemotePlayers } from "../../service";

export const MatchPlayersOverview: FC = () => {
  const players = useRemotePlayers();
  const matchStage = useStore((state) => state.matchStage);
  const leaderboard = useStore((state) => state.leaderboard);

  const winner = leaderboard.at(0);

  // TODO: check if player is the winner to fix style
  return (
    <MatchPlayersOverviewWrapper isWinner>
      {matchStage === "endOfMatchStage" ? (
        <MatchWinner player={winner} />
      ) : (
        players.map((player) => <MatchPlayer key={player.userId} player={player} totalPlayers={players.length} />)
      )}
    </MatchPlayersOverviewWrapper>
  );
};
