import { FC } from "react";

import { text, PowerUpCards, HealDiceCoffin, TombstoneHand, CallBoloney } from "../../assets";
import { NumberedListSection } from "../../atoms";
import { FooterComponent } from "../footer-component";
import { ImageContainer } from "../image-containers";
import { NumberedParagraph } from "../landing-paragraphs";
import { LargeHeadingSection } from "./large-heading-section";
import { RightDisplaySection } from "./styles";

export const DesktopLanding: FC = () => {
  return (
    <>
      <NumberedListSection>
        <NumberedParagraph heading={text.landing.paragraphOneHeading} paragraph={text.landing.paragraphOne} />
        <RightDisplaySection>
          <NumberedParagraph heading={text.landing.paragraphTwoHeading} paragraph={text.landing.paragraphTwo} />
        </RightDisplaySection>
        <NumberedParagraph heading={text.landing.paragraphThreeHeading} paragraph={text.landing.paragraphThree} />
      </NumberedListSection>
      <LargeHeadingSection firstText={text.landing.letsRule} secondText={text.landing.theGame} />
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

      <FooterComponent />
    </>
  );
};
