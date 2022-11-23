import { FC } from "react";

import { GamePlayersOverviewWrapper } from "./styles";
import { fakePlayers } from "../../assets/fake-data";
import { useStore } from "../../store";
import { GamePlayer } from "./game-player";
import { GameWinner } from "./game-winner";
import { ErrorView } from "../error-view";

export const GamePlayersOverview: FC = () => {
  const players = useStore((state) => state.getRemotePlayers());
  const matchStage = useStore((state) => state.matchStage);
  // TODO: get leaderboard from store
  const leaderboard = fakePlayers;

  const winner = leaderboard.at(0);

  if (!winner) return <ErrorView />;

  return (
    <GamePlayersOverviewWrapper isWinner>
      {matchStage === "endOfMatchStage" ? (
        <GameWinner player={winner} />
      ) : (
        players.map((player) => <GamePlayer key={player.userId} player={player} totalPlayers={players.length} />)
      )}
    </GamePlayersOverviewWrapper>
  );
};
