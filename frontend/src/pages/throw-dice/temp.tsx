// import Dice from "react-dice-roll";
import DiceBox from "@3d-dice/dice-box";
import { GameLayout, GeneralContentWrapper, Heading2, Heading6, HeadingContentWrapper, PrimaryButton } from "../../components";
import { color } from "../../design";
import { Players } from "../../service/fake-players";
import { AttributesContainer, DiceContainer } from "./styles";

import { useState } from "react";
import { YourDice } from "./your-dice";
import { Die } from "../../interfaces";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const Box = new DiceBox("#dice-box", {
  assetPath: "/assets/dice-box/",
  theme: "smooth",
  offscreen: false,
  scale: 5,
  themeColor: color.darkBlue,
});

const init = () => {
  Box.init()
    .then(async () => {
      document.addEventListener("mousedown", () => {
        const diceBoxCanvas = document.getElementById("dice-canvas");
        console.log(diceBoxCanvas);
        if (diceBoxCanvas)
          if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
            Box.hide().clear();
          }
      });

      Box.roll(["6d6"]);
    })
    .catch((e: any) => {
      console.log(e);
    });
};

export const ThrowDice = () => {
  const [hasRolled, setHasRolled] = useState(false);
  const [rollComplete, setRollComplete] = useState(false);
  const [diceValues, setDiceValues] = useState<Die[] | undefined>();

  const getRolledValues = (rolls: any): Die[] => {
    const values: Die[] = [];

    rolls.map((roll: any, index: number) => {
      const tempValue = roll.value;
      values[index] = { rolledValue: tempValue };
    });

    return values;
  };

  Box.onRollComplete = async (results: any) => {
    await delay(3000);
    const rolls = getRolledValues(results[0].rolls);
    console.log(rolls);
    setRollComplete(true);
    setDiceValues(rolls);
    Box.hide().clear();
  };

  if (rollComplete) return <YourDice diceValues={diceValues} />;

  return (
    <DiceContainer>
      {/* <GameLayout players={[Players[6]]}> */}
        <GeneralContentWrapper>
          <HeadingContentWrapper>
            <Heading6>{"setting it up"}</Heading6>
          </HeadingContentWrapper>
          <Heading2>{"your dice"}</Heading2>
          <Heading2 customColor={color.darkGrey}>{"Welcome Skiny.boy, let’s find out your pips for this first round..."}</Heading2>
        </GeneralContentWrapper>
        <AttributesContainer>
          {!hasRolled && (
            <PrimaryButton
              onClick={() => {
                init();
                setHasRolled(true);
              }}
              text="roll it"
            />
          )}
        </AttributesContainer>
      </GameLayout>
    </DiceContainer>
  );
};
