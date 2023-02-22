import { FC } from "react";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { FadeTransition } from "../page-transition";

export const UseMenageATrois: FC = () => {
  return (
    <BottomButtonWrapper>
      <FadeTransition>
        <Heading2>{text.match.rollingYourDice}</Heading2>
      </FadeTransition>
      <PrimaryButton primaryText="Rolling dice" isSpinnerShown={true} />
    </BottomButtonWrapper>
  );
};
