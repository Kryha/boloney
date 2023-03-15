import { FC } from "react";

import { avatars, text } from "../../assets";
import { color, handProportion } from "../../design";
import { useViewport } from "../../hooks";
import { useLocalPlayer } from "../../service";
import { useStore } from "../../store";
import { PlayerRanked } from "../../types";
import { prefixDigit } from "../../util";
import { Bold } from "../atoms";
import { WinnerBadge } from "../badges";
import { DiceIcon, PowerUpIcon } from "../icons";
import {
  DataWrapper,
  Description,
  DiceAndPowerUps,
  LeaderboardAvatar,
  LeaderboardDetails,
  LeaderboardStanding,
  LeaderboardWrapper,
  PlayerAvatar,
  Username,
} from "./styles";

interface Props {
  player: PlayerRanked;
  rank: number;
}

export const PlayerLeaderboard: FC<Props> = ({ player, rank }) => {
  const localPlayer = useLocalPlayer();
  const { width } = useViewport();
  const lastAction = useStore((state) => state.lastAction);
  const { avatar } = handProportion(avatars[player.avatarId].name);
  const avatarColor = avatars[player.avatarId].color;
  const isWinner = rank === 1;
  const isSecond = rank === 2;

  const [normalDescription, boldDescription] = (() => {
    if (isWinner && lastAction === "lostByTimeOut") return text.endOfMatch.wonByTimeOut;
    if (isWinner) return text.endOfMatch.wonCalling(lastAction);
    if (isSecond) return text.endOfMatch.lostOnRound("last");
    return text.endOfMatch.lostOnRound(player.lostAtRound);
  })();

  return (
    <LeaderboardWrapper place={rank}>
      {isWinner && <WinnerBadge />}

      <DataWrapper isWinner={isWinner}>
        <LeaderboardStanding customColor={color.white}>{prefixDigit(rank)}</LeaderboardStanding>
        <LeaderboardAvatar>
          <PlayerAvatar alt={player.username} src={avatar} />
        </LeaderboardAvatar>
        <LeaderboardDetails>
          <Username>{localPlayer && text.endOfMatch.username(player.username, player.userId, localPlayer.userId)}</Username>
          <DiceAndPowerUps screenWidth={width}>
            <DiceIcon diceAmount={player.diceAmount} faceColor={avatarColor} />
            <PowerUpIcon powerUpAmount={player.powerUpsAmount} />
          </DiceAndPowerUps>
          <Description>
            {normalDescription} <Bold>{boldDescription}</Bold>
          </Description>
        </LeaderboardDetails>
      </DataWrapper>
    </LeaderboardWrapper>
  );
};
