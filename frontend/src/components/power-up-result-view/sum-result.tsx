import { FC } from "react";
import { text } from "../../assets";
import { Heading0, Heading2 } from "../atoms";
import { TextInfoContainer } from "./styles";

interface SumResultProps {
  sum: number;
}
export const SumResult: FC<SumResultProps> = ({ sum }) => {
  return (
    <TextInfoContainer>
      <Heading2>{text.powerUps.theTotalSumOfTheDice}</Heading2>
      <Heading0>{sum}</Heading0>
    </TextInfoContainer>
  );
};
