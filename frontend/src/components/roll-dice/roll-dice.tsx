import { FC } from "react";
import Highlighter from "react-highlight-words";

import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
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

  const hasRolledDice = useStore((state) => state.hasRolledDice);
  const localPlayer = useLocalPlayer();
  const dice = useStore((state) => state.diceValue);

  if (!localPlayer) return <ErrorView />;

  const dieColor = getDieColor(localPlayer);

  const button = () => {
    if (localPlayer.status === "lost") return <></>;
    if (hasRolledDice) return <ButtonReady />;
    return <PrimaryButton text={text.general.rollIt} onClick={() => sendMatchState(MatchOpCode.ROLL_DICE)} />;
  };

  return (
    <BottomButtonWrapper>
      <Timer title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>
        <Highlighter
          highlightClassName="bold"
          searchWords={[localPlayer.username]}
          autoEscape
          textToHighlight={text.param.findOutYourPips(localPlayer.username)}
        />
      </Heading2>

      {dice && <RollingDice dice={dice} dieColor={dieColor} />}

      {button()}
    </BottomButtonWrapper>
  );
};
