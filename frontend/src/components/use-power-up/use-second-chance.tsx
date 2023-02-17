import { FC, useState } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useLocalPlayer, useMatch } from "../../service";
import { useStore } from "../../store";
import { Die } from "../../types";
import { getDieColor } from "../../util";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { ErrorView } from "../error-view";
import { PlayerDiceSelector } from "../place-bid/player-dice";
import { DieWrapper, SecondChanceWrapper } from "./styles";

export const UseSecondChance: FC = () => {
  const localPlayerDice = useStore((state) => state.diceValue);
  const localPlayer = useLocalPlayer();
  const [selectedDice, setSelectedDice] = useState<number[]>([]);
  const { broadcastUsePowerUp } = useMatch();

  const isDisabled = selectedDice.length <= 0;

  const handleClick = (buttonIndex: number) => {
    if (!selectedDice.includes(buttonIndex)) {
      setSelectedDice(() => [...selectedDice, buttonIndex]);
    } else {
      setSelectedDice(() => selectedDice.filter((_, index) => index !== selectedDice.indexOf(buttonIndex)));
    }
  };
  if (!localPlayerDice || !localPlayer) return <ErrorView headingText={text.error.noDiceAvailable} />;

  const handleSubmit = () => {
    const payload: Die[] = localPlayerDice.filter((_, index) => selectedDice.includes(index));
    broadcastUsePowerUp({ id: "6", data: { diceToReroll: payload } });
  };

  return (
    <BottomButtonWrapper>
      <SecondChanceWrapper>
        <Heading2>{text.powerUps.feelThePower}</Heading2>
        <Heading2 customColor={color.darkGrey}>{text.powerUps.playingSecondChance} </Heading2>
        <DieWrapper>
          <PlayerDiceSelector
            playerDice={localPlayerDice}
            handleClick={handleClick}
            selectedDice={selectedDice}
            dieColor={getDieColor(localPlayer)}
          />
        </DieWrapper>
        <PrimaryButton primaryText={text.general.rollIt} disabled={isDisabled} onClick={handleSubmit} />
      </SecondChanceWrapper>
    </BottomButtonWrapper>
  );
};
