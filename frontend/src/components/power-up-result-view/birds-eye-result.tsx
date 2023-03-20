import { FC } from "react";

import { text } from "../../assets";
import { Heading2, InfoDisplay } from "../atoms";
import { TextInfoContainer } from "./styles";

interface Props {
  sum: number;
}

export const BirdsEyeResult: FC<Props> = ({ sum }) => {
  return (
    <TextInfoContainer>
      <Heading2>{text.powerUps.theTotalSumOfTheDice}</Heading2>
      <InfoDisplay>{sum}</InfoDisplay>
    </TextInfoContainer>
  );
};
