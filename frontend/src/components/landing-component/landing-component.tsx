import { FC, useEffect } from "react";
import { CallBoloney, HealDiceCoffin, PowerUpCards, text, TombstoneHand } from "../../assets";
import { OPEN_LINK_IN_NEW_TAB } from "../../constants";
import { color, fonts, fontSizes, fontWeights, lineHeights } from "../../design";
import { useObserver, useViewport } from "../../hooks";
import { useStore } from "../../store";
import { NumberedListSection, LinkText } from "../atoms";
import { ImageContainer } from "../image-containers";
import { NumberedParagraph } from "../landing-paragraphs";
import { BottomLinkSection } from "./bottom-link-section";
import { LargeHeadingSection } from "./large-heading-section";
import {
  AppName,
  BottomHeading,
  LandingBottomHeading,
  LandingComponentContainer,
  LandingComponentWrapper,
  LandingImage,
  RightDisplaySection,
  VisibilityContainer,
} from "./styles";

export const LandingComponent: FC = () => {
  const { width, height } = useViewport();
  const setIsSidebarVisible = useStore((state) => state.setIsSidebarVisible);
  const { ref, isVisible } = useObserver();

  useEffect(() => {
    if (isVisible) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isVisible, setIsSidebarVisible]);

  return (
    <LandingComponentWrapper>
      <AppName />
      <BottomHeading>
        <LandingBottomHeading>{text.landing.theUtterlyAbsurdDice}</LandingBottomHeading>
        <LinkText
          href={text.landing.aleoLink}
          target={OPEN_LINK_IN_NEW_TAB}
          font={fonts.secondary}
          fontSize={fontSizes.heading2}
          fontWeight={fontWeights.regular}
          lineHeight={lineHeights.heading2}
          customColor={color.black}
        >
          {text.landing.aleo}
        </LinkText>
        <LandingBottomHeading>{text.landing.by}</LandingBottomHeading>
        <LinkText
          href={text.landing.kryhaLink}
          target={OPEN_LINK_IN_NEW_TAB}
          font={fonts.secondary}
          fontSize={fontSizes.heading2}
          fontWeight={fontWeights.regular}
          lineHeight={lineHeights.heading2}
          customColor={color.black}
        >
          {text.landing.kryha}
        </LinkText>
      </BottomHeading>
      <LandingImage src={CallBoloney} alt="boloney" width={width} height={height} />
      <LandingComponentContainer width={width} height={height}>
        <VisibilityContainer ref={ref} />
        <NumberedListSection>
          <NumberedParagraph heading={text.landing.paragraphOneHeading} paragraph={text.landing.paragraphOne} />
          <RightDisplaySection>
            <NumberedParagraph heading={text.landing.paragraphTwoHeading} paragraph={text.landing.paragraphTwo} />
          </RightDisplaySection>
          <NumberedParagraph heading={text.landing.paragraphThreeHeading} paragraph={text.landing.paragraphThree} />
        </NumberedListSection>
        <LargeHeadingSection firstText={text.landing.lets} secondText={text.landing.ruleThe} />
        <ImageContainer image={CallBoloney} heading={text.landing.bestBlufferWins} paragraph={text.landing.boloneyDescription} />
        <ImageContainer
          image={PowerUpCards}
          heading={text.landing.creatorsChoice}
          paragraph={text.landing.multiplayerDescription}
          isImageRight
        />
        <ImageContainer image={HealDiceCoffin} heading={text.landing.everyTurnCounts} paragraph={text.landing.takeTurnsToRoll} />
        <ImageContainer image={TombstoneHand} heading={text.landing.gloryAwaits} paragraph={text.landing.masterMindGames} isImageRight />
        <LargeHeadingSection firstText={text.landing.joinThe} secondText={text.landing.chatter} />
        <BottomLinkSection />
      </LandingComponentContainer>
    </LandingComponentWrapper>
  );
};
