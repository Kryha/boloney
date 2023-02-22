import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { routes } from "../../navigation";
import { Heading2, Heading6 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useLocalPlayer, useMatch } from "../../service";
import { color } from "../../design";
import { PlayerLeaderboard } from "./player-leaderboard";
import { EndOfMatchWrapper, MatchStatsButtonWrapper, TitleSection } from "./styles";
import { useStore } from "../../store";
import { FadeTransition } from "../page-transition";
import { MULTIPLE_FADE_TRANSITION_DURATION } from "../../constants";

export const EndOfMatch: FC = () => {
  const navigate = useNavigate();
  const { broadcastPlayerReady } = useMatch();

  const leaderboard = useStore((state) => state.leaderboard);

  const localPlayer = useLocalPlayer();

  const [isLocalWinner, isLocalLoser] = (() => {
    const winner = leaderboard.at(0);
    const secondPlayer = leaderboard.at(1);
    return [winner?.userId === localPlayer?.userId, secondPlayer?.userId === localPlayer?.userId];
  })();

  const handleNewMatch = (): void => {
    broadcastPlayerReady();
    navigate(routes.home);
  };

  const headingText = () => {
    if (isLocalWinner) return text.endOfMatch.youWonTitle;
    if (isLocalLoser) return text.endOfMatch.youLostTitle(leaderboard.at(0)?.username || "");
    return text.endOfMatch.weHaveAWinner;
  };

  const headingDescription = () => {
    if (isLocalWinner) return text.endOfMatch.youWonDescription;
    return text.endOfMatch.youLostDescription;
  };

  return (
    <FadeTransition>
      <EndOfMatchWrapper>
        <TitleSection>
          <Heading6>{text.endOfMatch.endOfMatch}</Heading6>
          <Heading2>{headingText()}</Heading2>
          <Heading2 customColor={color.darkGrey}>{headingDescription()}</Heading2>
        </TitleSection>

        {leaderboard.map((player, i) => (
          <FadeTransition key={player.userId} animationKey={player.userId} delay={MULTIPLE_FADE_TRANSITION_DURATION * i + 1}>
            <PlayerLeaderboard player={player} rank={i + 1} />
          </FadeTransition>
        ))}

        <MatchStatsButtonWrapper>
          <PrimaryButton primaryText={text.match.homePage} onClick={() => handleNewMatch()} />
        </MatchStatsButtonWrapper>
      </EndOfMatchWrapper>
    </FadeTransition>
  );
};
