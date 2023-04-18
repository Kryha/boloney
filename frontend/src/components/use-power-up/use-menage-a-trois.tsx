import { FC } from "react";
import { text } from "../../assets";
import { PrimaryButton } from "../../molecules";
import { BottomButtonWrapper, Heading2 } from "../../atoms";
import { FadeTransition } from "../page-transition";

export const UseMenageATrois: FC = () => {
  return (
    <BottomButtonWrapper>
      <FadeTransition>
        <Heading2>{text.match.rollingYourDice}</Heading2>
      </FadeTransition>
      <PrimaryButton primaryText={text.general.rollingDice} loading />
    </BottomButtonWrapper>
  );
};
