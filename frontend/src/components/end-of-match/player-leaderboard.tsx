import { FC } from "react";

import { avatars } from "../../assets";
import { handProportion } from "../../design";
import { PlayerPublic } from "../../types";
import { prefixDigit } from "../../util";
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
  WinnerBadge,
} from "./styles";

// TODO: create a new player data type enriched with history data for description purposes
interface Props {
  player: PlayerPublic;
  place: number;
}

export const PlayerLeaderboard: FC<Props> = ({ player, place }) => {
  const { avatar } = handProportion(avatars[player.avatarId].name);

  return (
    <LeaderboardWrapper place={place}>
      {/* TODO: implement badge */}
      {place === 1 && <WinnerBadge></WinnerBadge>}

      <DataWrapper>
        <LeaderboardStanding>{prefixDigit(place)}</LeaderboardStanding>
        <LeaderboardAvatar>
          <PlayerAvatar alt={player.username} src={avatar} />
        </LeaderboardAvatar>
        <LeaderboardDetails>
          <Username>{player.username}</Username>
          <DiceAndPowerUps>
            <DiceIcon diceAmount={player.diceAmount} />
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
