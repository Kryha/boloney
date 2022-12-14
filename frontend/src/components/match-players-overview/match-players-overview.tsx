import { FC } from "react";

import { MatchPlayersOverviewWrapper } from "./styles";
import { fakePlayers } from "../../assets/fake-data";
import { useStore } from "../../store";
import { MatchPlayer } from "./match-player";
import { MatchWinner } from "./match-winner";
import { ErrorView } from "../error-view";
import { useRemotePlayers } from "../../service";

export const MatchPlayersOverview: FC = () => {
  const players = useRemotePlayers();
  const matchStage = useStore((state) => state.matchStage);
  // TODO: get leaderboard from store
  const leaderboard = fakePlayers;

  const winner = leaderboard.at(0);

  if (!winner) return <ErrorView />;
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
