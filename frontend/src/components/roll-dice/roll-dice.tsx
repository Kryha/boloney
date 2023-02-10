import { FC } from "react";
import Highlighter from "react-highlight-words";

import { text } from "../../assets";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { Timer } from "../timer";
import { color } from "../../design";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { PrimaryButton } from "../buttons";
import { useLocalPlayer, useMatch } from "../../service";
import { MatchOpCode } from "../../types";
import { ButtonReady } from "../button-ready";
import { getDieColor } from "../../util";
import { RollingDice } from "../dice-animation";

export const RollDice: FC = () => {
  const { sendMatchState } = useMatch();

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
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
    return <PrimaryButton primaryText={text.general.rollIt} onClick={() => handleClick()} isBottomButton />;
  };

  if (hasRolledDice && isPlayerReady) {
    return (
      <BottomButtonWrapper>
        <Timer title={text.powerUps.waitingTime} />
        <Heading1>{text.powerUps.timeToWait}</Heading1>
        <Heading2 customColor={color.darkGrey}>{text.powerUps.waitForPlayers}</Heading2>

        {dice && <RollingDice dice={dice} dieColor={dieColor} />}

        {button()}
      </BottomButtonWrapper>
    );
  }

  return (
    <BottomButtonWrapper>
      <Timer title={text.powerUps.settingItUp} />
      <Heading1>{text.match.getDice}</Heading1>
      <Heading2 customColor={color.darkGrey}>
        <Highlighter
          highlightClassName="bold"
          searchWords={[localPlayer.username]}
          autoEscape
          textToHighlight={text.match.findOutYourPips}
        />
      </Heading2>

      {dice && <RollingDice dice={dice} dieColor={dieColor} />}

      {button()}
    </BottomButtonWrapper>
  );
};
