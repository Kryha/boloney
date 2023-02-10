import { FC } from "react";
import { color } from "../../design";
import { useObserver } from "../../hooks";
import { Heading0 } from "../atoms";
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
      <Heading0 customColor={color.mediumGrey}>{firstText}</Heading0>
      <RightDisplaySection>
        <LandingHeading customColor={color.mediumGrey}>{secondText}</LandingHeading>
      </RightDisplaySection>
      <LandingHeading customColor={color.mediumGrey}>{lastText}</LandingHeading>
    </LargeHeadingWrapper>
  );
};
