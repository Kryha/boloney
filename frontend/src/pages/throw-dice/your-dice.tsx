import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Die, GameLayout, GeneralContentWrapper, Heading2, Heading6, HeadingContentWrapper, PrimaryButton } from "../../components";
import { color, margins } from "../../design";
import { Die as DiceValue } from "../../interfaces";
import { routes } from "../../navigation";
import { Players } from "../../service/fake-players";
import { AttributesContainer, DiceContainer, DiceValueContainer } from "./styles";

interface YourDiceProps {
  diceValues: DiceValue[] | undefined; // find actual name
}

export const YourDice: FC<YourDiceProps> = ({ diceValues }) => {
  const navigate = useNavigate();

  if (!diceValues) return <></>;

  return (
    <DiceContainer>
      <GameLayout players={[Players[6]]}>
        <GeneralContentWrapper>
          <HeadingContentWrapper>
            <Heading6>{"setting it up"}</Heading6>
          </HeadingContentWrapper>
          <Heading2>{"your dice"}</Heading2>
          <Heading2 customColor={color.darkGrey}>{"Welcome Skiny.boy, let’s find out your pips for this first round..."}</Heading2>
        </GeneralContentWrapper>
        <DiceValueContainer>
          {diceValues.map((dice, index) => (
            <Die key={index} value={dice.rolledValue} faceColor={color.darkBlue} pipColor={color.pureWhite} size={"5em"} />
          ))}
        </DiceValueContainer>
        <AttributesContainer>
          <PrimaryButton onClick={() => navigate(routes.game)} text="continue" />
        </AttributesContainer>
      </GameLayout>
    </DiceContainer>
  );
};
