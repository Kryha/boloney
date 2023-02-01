import { FC, useEffect, useState } from "react";

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
  const [isShuffling, setIsShuffling] = useState(false);
  const isEndOfMatch = matchStage === "endOfMatchStage";
  // TODO: Fix animation for this component
  // useEffect(() => {
  //   setIsShuffeling(true);
  //   setTimeout(() => {
  //     setIsShuffeling((isShuffling) => !isShuffling);
  //   }, 5500);
  // }, [playerOrder]);

  const winner = leaderboard.at(0);

  const isWinner = localPlayer?.actionRole === "winner";

  return (
    <MatchPlayersOverviewWrapper
      isWinner={isWinner}
      isShuffling={isShuffling}
      isOnePlayer={playerOrder.length === 1}
      isEndOfMatch={isEndOfMatch}
    >
      {isEndOfMatch ? (
        <MatchWinner player={winner} />
      ) : (
        playerOrder.map((player) => <MatchPlayer key={player.userId} player={player} totalPlayers={playerOrder.length} />)
      )}
    </MatchPlayersOverviewWrapper>
  );
};
