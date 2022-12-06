import { FC } from "react";

import { avatars } from "../../assets";
import { color, handProportion } from "../../design";
import { PlayerPublic } from "../../types";
import { prefixDigit } from "../../util";
import { WinnerBadge } from "../badges";
import { DiceIcon, PowerUpIcon } from "../icons";
import {
  DataWrapper,
  Description,
  DescriptionBold,
  DescriptionWrapper,
  DiceAndPowerUps,
  LeaderboardAvatar,
  LeaderboardDetails,
  LeaderboardStanding,
  LeaderboardWrapper,
  PlayerAvatar,
  Username,
} from "./styles";

// TODO: create a new player data type enriched with history data for description purposes
interface Props {
  player: PlayerPublic;
  rank: number;
}

export const PlayerLeaderboard: FC<Props> = ({ player, rank }) => {
  const { avatar } = handProportion(avatars[player.avatarId].name);
  const avatarColor = avatars[player.avatarId].color;
  const isWinner = rank === 1;

  return (
    <LeaderboardWrapper place={rank}>
      {isWinner && <WinnerBadge />}

      <DataWrapper isWinner={isWinner}>
        <LeaderboardStanding customColor={color.pureWhite}>{prefixDigit(rank)}</LeaderboardStanding>
        <LeaderboardAvatar>
          <PlayerAvatar alt={player.username} src={avatar} />
        </LeaderboardAvatar>
        <LeaderboardDetails>
          <Username>{player.username}</Username>
          <DiceAndPowerUps>
            <DiceIcon diceAmount={player.diceAmount} faceColor={avatarColor} />
            <PowerUpIcon powerUpAmount={player.powerUpsAmount} />
          </DiceAndPowerUps>
          <DescriptionWrapper>
            {/* TODO: write correct text */}
            <Description>Blah blah...</Description>
            {/* TODO: write correct text */}
            <DescriptionBold>Blah blah...</DescriptionBold>
          </DescriptionWrapper>
        </LeaderboardDetails>
      </DataWrapper>
    </LeaderboardWrapper>
  );
};
