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
import { useClientTimer } from "../../hooks";
import { WaitingForPlayers } from "./waiting-for-players";

export const RollDice: FC = () => {
  const { sendMatchState } = useMatch();

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);
  const hasRolledDice = useStore((state) => state.hasRolledDice);
  const localPlayer = useLocalPlayer();
  const setPlayerReady = useStore((state) => state.setPlayerReady);
  const isPlayerReady = useStore((state) => state.isPlayerReady);
  const dice = useStore((state) => state.diceValue);

  useClientTimer(hasRolledDice);

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
    return <PrimaryButton primaryText={text.general.rollIt} onClick={() => handleClick()} isLoading={isLoadingSpinnerVisible} />;
  };

  // In case of timeout player shouldn't be see this view.
  if (isPlayerReady) return <WaitingForPlayers />;

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
