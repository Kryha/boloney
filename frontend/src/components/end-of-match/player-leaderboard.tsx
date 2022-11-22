import { FC } from "react";

import { PlayerPublic } from "../../types";
import { LeaderboardAvatar, LeaderboardDetails, LeaderboardStanding, LeaderboardWrapper } from "./styles";

interface Props {
  player: PlayerPublic;
  place: number;
}

export const PlayerLeaderboard: FC<Props> = ({ player }) => {
  return (
    <LeaderboardWrapper>
      <LeaderboardStanding></LeaderboardStanding>
      <LeaderboardAvatar></LeaderboardAvatar>
      <LeaderboardDetails></LeaderboardDetails>
    </LeaderboardWrapper>
  );
};
