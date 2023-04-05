import { FC } from "react";
import { color } from "../../design";
import { LandingDisplay } from "../atoms";
import { useObserver } from "../../hooks";
import { LandingHeading, LargeHeadingWrapper, RightDisplaySection } from "./styles";

interface Props {
  firstText?: string;
  secondText?: string;
  lastText?: string;
}

export const LargeHeadingSection: FC<Props> = ({ firstText, secondText, lastText }) => {
  const { ref, isVisible } = useObserver();

  return (
    <LargeHeadingWrapper ref={ref} isVisible={isVisible}>
      <LandingDisplay customcolor={color.mediumGrey}>{firstText}</LandingDisplay>
      <RightDisplaySection>
        <LandingHeading customcolor={color.mediumGrey}>{secondText}</LandingHeading>
      </RightDisplaySection>
      <LandingHeading customcolor={color.mediumGrey}>{lastText}</LandingHeading>
    </LargeHeadingWrapper>
  );
};
