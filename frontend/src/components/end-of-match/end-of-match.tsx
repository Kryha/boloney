import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { routes } from "../../navigation";
import { useLocalPlayer } from "../../service";
import { color, layoutWidth } from "../../design";
import { BottomButtonWrapper, Heading2, Heading6 } from "../../atoms";
import { PlayerLeaderboard } from "./player-leaderboard";
import { EndOfMatchWrapper, TitleSection } from "./styles";
import { useStore } from "../../store";
import { FadeTransition } from "../page-transition";
import { MULTIPLE_FADE_TRANSITION_DURATION } from "../../constants";
import { PrimaryButton } from "../../molecules";

export const EndOfMatch: FC = () => {
  const navigate = useNavigate();

  const leaderboard = useStore((state) => state.leaderboard);

  const localPlayer = useLocalPlayer();

  const isDraw = !leaderboard.at(0);

  const [isLocalWinner, isLocalLoser] = (() => {
    const winner = leaderboard.at(0);
    const secondPlayer = leaderboard.at(1);
    return [winner?.userId === localPlayer?.userId, secondPlayer?.userId === localPlayer?.userId];
  })();

  const headingText = () => {
    if (isLocalWinner) return text.endOfMatch.youWonTitle;
    if (isLocalLoser) return text.endOfMatch.youLostTitle(leaderboard.at(0)?.username || "");
    return text.endOfMatch.weHaveAWinner;
  };

  const headingDescription = () => {
    if (isLocalWinner) return text.endOfMatch.youWonDescription;
    return text.endOfMatch.youLostDescription;
  };

  // TODO: change placeholder for draw view once we have the design
  return (
    <FadeTransition>
      <EndOfMatchWrapper>
        <TitleSection>
          <Heading6>{text.endOfMatch.endOfMatch}</Heading6>
          {isDraw ? (
            <Heading2>{text.endOfMatch.drawTitle}</Heading2>
          ) : (
            <>
              <Heading2>{headingText()}</Heading2>
              <Heading2 customcolor={color.darkGrey}>{headingDescription()}</Heading2>
            </>
          )}
        </TitleSection>

        {leaderboard.map((player, i) => (
          <FadeTransition key={player.userId} animationKey={player.userId} delay={MULTIPLE_FADE_TRANSITION_DURATION * i + 1}>
            <PlayerLeaderboard player={player} rank={i + 1} />
          </FadeTransition>
        ))}

        <BottomButtonWrapper bottomPosition={layoutWidth.none} leftPosition={layoutWidth.sm}>
          <PrimaryButton primaryText={text.match.homePage} onClick={() => navigate(routes.feedback)} />
        </BottomButtonWrapper>
      </EndOfMatchWrapper>
    </FadeTransition>
  );
};
