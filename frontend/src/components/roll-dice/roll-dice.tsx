import { FC } from "react";

import { text } from "../../assets";
import { BottomButtonWrapper } from "../../atoms";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { useLocalPlayer, useMatch } from "../../service";
import { MatchOpCode } from "../../types";
import { ButtonReady } from "../button-ready";
import { getDieColor } from "../../util";
import { RollingDice } from "../dice-animation";
import { MatchHeading } from "../match-heading";
import { FadeTransition } from "../page-transition";
import { Timer } from "../timer";
import { PrimaryButton } from "../../molecules";

export const RollDice: FC = () => {
  const { sendMatchState } = useMatch();

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);
  const hasRolledDice = useStore((state) => state.hasRolledDice);
  const localPlayer = useLocalPlayer();
  const setPlayerReady = useStore((state) => state.setPlayerReady);
  const isPlayerReady = useStore((state) => state.isPlayerReady);
  const dice = useStore((state) => state.diceValue);

  if (!localPlayer) return <ErrorView />;

  const dieColor = getDieColor(localPlayer);

  const handleClick = (): void => {
    setSpinnerVisibility(true);
    setPlayerReady(false);
    sendMatchState(MatchOpCode.ROLL_DICE);
  };

  const button = () => {
    if (localPlayer.status === "lost") return <></>;
    if (hasRolledDice) return <ButtonReady />;
    return <PrimaryButton primaryText={text.general.rollIt} onClick={() => handleClick()} loading={isLoadingSpinnerVisible} />;
  };

  if (hasRolledDice && isPlayerReady) {
    return (
      <BottomButtonWrapper>
        <MatchHeading headingOne={text.powerUps.timeToWait} headingTwo={text.powerUps.waitForPlayers} isAnimated />
      </BottomButtonWrapper>
    );
  }

  return (
    <FadeTransition>
      <Timer title={text.powerUps.settingItUp} />
      <BottomButtonWrapper>
        <MatchHeading
          headingOne={text.match.getDice}
          headingTwo={text.match.findOutYourPips}
          wordsToBold={[localPlayer.username]}
          isAnimated
        />

        {dice && <RollingDice dice={dice} dieColor={dieColor} />}

        {button()}
      </BottomButtonWrapper>
    </FadeTransition>
  );
};
