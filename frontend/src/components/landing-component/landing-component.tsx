import { FC, useEffect } from "react";
import { CallBoloney, HealDiceCoffin, PowerUpCards, text, TombstoneHand } from "../../assets";
import { useObserver, useViewport } from "../../hooks";
import { useStore } from "../../store";
import { NumberedListSection } from "../atoms";
import { ImageContainer } from "../image-containers";
import { NumberedParagraph } from "../landing-paragraphs";
import { BottomLinkSection } from "./bottom-link-section";
import { LargeHeadingSection } from "./large-heading-section";
import {
  AppName,
  BottomHeading,
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
      <BottomHeading>{text.landing.theUtterlyAbsurdDice}</BottomHeading>
      <LandingImage src={CallBoloney} alt="boloney" width={width} height={height} />
      <VisibilityContainer ref={ref} />
      <LandingComponentContainer width={width} height={height}>
        <NumberedListSection>
          <NumberedParagraph heading={text.landing.paragraphOneHeading} paragraph={text.landing.paragraphOne} />
          <RightDisplaySection>
            <NumberedParagraph heading={text.landing.paragraphTwoHeading} paragraph={text.landing.paragraphTwo} />
          </RightDisplaySection>
          <NumberedParagraph heading={text.landing.paragraphThreeHeading} paragraph={text.landing.paragraphThree} />
        </NumberedListSection>
        <LargeHeadingSection firstText={text.landing.lets} secondText={text.landing.ruleThe} lastText={text.landing.game} />
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
