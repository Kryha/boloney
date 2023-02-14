import { FC } from "react";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";

export const UseMenageATrois: FC = () => {
  return (
    <BottomButtonWrapper>
      <Heading2>{text.match.rollingYourDice}</Heading2>
      <PrimaryButton primaryText="Rolling dice" isSpinnerShown={true} />
    </BottomButtonWrapper>
  );
};
