import { FC } from "react";

import { color } from "../../design";
import { DieOverviewWrapper, DieOverviewContainer, YourDiceContainer } from "./styles";
import { Die } from "../die";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";

interface DiceOverviewProps {}

export const DiceOverview: FC<DiceOverviewProps> = () => {
  return (
    <DieOverviewWrapper>
      <DieOverviewContainer>
        <YourDiceContainer>
          <Die value={1} />
          <Die value={2} />
          <Die value={3} />
          <Die value={4} />
          <Die value={5} />
        </YourDiceContainer>
        <GeneralText>{text.param.yourDice(7)}</GeneralText>
      </DieOverviewContainer>
    </DieOverviewWrapper>
  );
};
