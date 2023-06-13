import { FC, useEffect, useState } from "react";

import { useArrangedPlayers, useLatestBid } from "../../service";
import { useStore } from "../../store";
import { MatchWinner } from "./match-winner";
import { MatchSideBar } from "../match-sidebar";

export const MatchPlayersOverview: FC = () => {
  const matchStage = useStore((state) => state.matchStage);
  const leaderboard = useStore((state) => state.leaderboard);
  const isShuffling = useStore((state) => state.isShufflingPlayers);
  const setShuffling = useStore((state) => state.setShufflingPlayers);
  const isEndOfMatch = matchStage === "endOfMatchStage";
  const arrangedPlayers = useArrangedPlayers();
  const [active, setActive] = useState(false);
  const lastBid = useLatestBid();

  useEffect(() => {
    setTimeout(() => {
      if (isShuffling) setShuffling(false);
    }, 1500);
  }, [isShuffling, setShuffling]);

  const winner = leaderboard.at(0);

  const areDeadPlayers = arrangedPlayers.map((player) => player.status === "lost");

  return (
    <>
      {isEndOfMatch ? (
        <MatchWinner player={winner} />
      ) : (
        <MatchSideBar
          players={arrangedPlayers}
          active={active}
          setActive={setActive}
          lastBid={lastBid}
          isShuffling={isShuffling}
          isEndOfMatch={isEndOfMatch}
          areDeadPlayers={areDeadPlayers}
        />
      )}
    </>
  );
};
