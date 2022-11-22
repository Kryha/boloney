import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { routes } from "../../navigation";
import { BottomButtonWrapper, Heading2, Heading6 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useMatch } from "../../service";
import { color } from "../../design";
import { fakePlayers } from "../../assets/fake-data";
import { PlayerLeaderboard } from "./player-leaderboard";

// TODO: finish component
export const EndOfMatch: FC = () => {
  const navigate = useNavigate();
  const { broadcastPlayerReady } = useMatch();
  // TODO: get leaderboard through store
  const leaderboard = fakePlayers;
  // TODO: get current user through store
  // TODO: implement functions to write correct text

  const handleNewMatch = (): void => {
    broadcastPlayerReady();
    navigate(routes.home);
  };

  const headingText = () => {
    // TODO: switch based on type of player
    return text.endOfMatch.youWon;
  };

  const subheadingText = () => {
    // TODO: switch based on type of player
    return text.endOfMatch.callingBoldMove("Boloney");
  };

  return (
    <BottomButtonWrapper>
      <Heading6>{text.endOfMatch.endOfMatch}</Heading6>
      <Heading2>{headingText()}</Heading2>
      <Heading2 customColor={color.darkGrey}>{subheadingText()}</Heading2>
      {leaderboard.map((player, i) => (
        <PlayerLeaderboard key={i} player={player} place={i + 1} />
      ))}
      <PrimaryButton text={text.match.newMatch} onClick={() => handleNewMatch()} />
    </BottomButtonWrapper>
  );
};
