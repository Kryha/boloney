import { FC } from "react";
import {
  CallBoloney,
  HealDiceCoffin,
  PlasticHand,
  PlasticHandPaint,
  PowerUpCards,
  text,
  TombstoneHand,
  WhiteDiceIconSVG,
} from "../../assets";
import { BaseIcon, BaseRow, FluidImage, GeneralRow } from "../../atoms";
import { color, fontSizes, fontWeights, iconSize, lineHeights, mobileHeight } from "../../design";
import { LargeInfoHeading, NumberedDescriptionText, NumberedSection, ParagraphDescription } from "../../molecules";
import { FooterComponent } from "../footer-component";
import { ChatterHeading, HeadingContainer, PaintedHand, ParagraphContainer } from "./styles";

export const MobileLanding: FC = () => {
  return (
    <>
      <NumberedSection>
        <NumberedDescriptionText
          heading={text.landing.paragraphOneHeading}
          subheading={text.landing.paragraphOne}
          numberColor={color.cloudWhite}
          subheadingColor={color.mediumGrey}
          subheadingFontSize={fontSizes.heading5}
          subheadingLineHeight={lineHeights.heading5}
        />
        <BaseRow>
          <BaseIcon
            src={<WhiteDiceIconSVG />}
            pipColor={color.darkBlue}
            width={iconSize.auto}
            height={mobileHeight.xl}
            iconColor={color.white}
            display="flex"
          />
        </BaseRow>
        <NumberedDescriptionText
          heading={text.landing.paragraphTwoHeading}
          subheading={text.landing.paragraphTwo}
          numberColor={color.cloudWhite}
          subheadingColor={color.mediumGrey}
          subheadingFontSize={fontSizes.heading5}
          subheadingLineHeight={lineHeights.heading5}
        />
        <PaintedHand alignItems="center" justifyContent="center">
          <FluidImage src={PlasticHand} alt="plastic hand" height={iconSize.fluid} width={iconSize.auto} />
          <FluidImage src={PlasticHandPaint} alt="paint" height={iconSize.fluid} width={iconSize.auto} />
        </PaintedHand>
        <NumberedDescriptionText
          heading={text.landing.paragraphThreeHeading}
          subheading={text.landing.paragraphThree}
          numberColor={color.cloudWhite}
          subheadingColor={color.mediumGrey}
          subheadingFontSize={fontSizes.heading5}
          subheadingLineHeight={lineHeights.heading5}
        />
        <HeadingContainer>
          <LargeInfoHeading
            heading={text.landing.lets}
            headingFontSize={fontSizes.heading3}
            headingLineHeight={lineHeights.heading3}
            headingColor={color.mediumGrey}
          />
          <LargeInfoHeading
            heading={text.landing.ruleThe}
            headingFontSize={fontSizes.heading3}
            headingLineHeight={lineHeights.heading3}
            headingColor={color.mediumGrey}
            justifyContent="flex-end"
            headingTransformation="lowercase"
          />
          <LargeInfoHeading
            heading={text.landing.game}
            headingFontSize={fontSizes.heading3}
            headingLineHeight={lineHeights.heading3}
            headingColor={color.mediumGrey}
          />
        </HeadingContainer>
        <GeneralRow alignItems="center" justifyContent="center">
          <FluidImage src={CallBoloney} height={mobileHeight.xl} width={iconSize.auto} />
        </GeneralRow>
        <ParagraphContainer>
          <ParagraphDescription
            headingFontSize={fontSizes.heading2}
            headingLineHeight={fontSizes.heading2}
            heading={text.landing.bestBlufferWins}
            subheading={text.landing.boloneyDescription}
            subheadingFontWeight={fontWeights.lighter}
          />
        </ParagraphContainer>
        <GeneralRow alignItems="center" justifyContent="center">
          <FluidImage src={PowerUpCards} height={mobileHeight.xl} width={iconSize.auto} />
        </GeneralRow>
        <ParagraphContainer>
          <ParagraphDescription
            headingFontSize={fontSizes.heading2}
            headingLineHeight={fontSizes.heading2}
            heading={text.landing.creatorsChoice}
            subheading={text.landing.multiplayerDescription}
            subheadingFontWeight={fontWeights.lighter}
          />
        </ParagraphContainer>
        <GeneralRow alignItems="center" justifyContent="center">
          <FluidImage src={HealDiceCoffin} height={mobileHeight.xl} width={iconSize.auto} />
        </GeneralRow>
        <ParagraphContainer>
          <ParagraphDescription
            headingFontSize={fontSizes.heading2}
            headingLineHeight={fontSizes.heading2}
            heading={text.landing.everyTurnCounts}
            subheading={text.landing.takeTurnsToRoll}
            subheadingFontWeight={fontWeights.lighter}
          />
        </ParagraphContainer>
        <GeneralRow alignItems="center" justifyContent="center">
          <FluidImage src={TombstoneHand} height={mobileHeight.xl} width={iconSize.auto} />
        </GeneralRow>
        <ParagraphContainer>
          <ParagraphDescription
            headingFontSize={fontSizes.heading2}
            headingLineHeight={fontSizes.heading2}
            heading={text.landing.gloryAwaits}
            subheading={text.landing.masterMindGames}
            subheadingFontWeight={fontWeights.lighter}
          />
        </ParagraphContainer>
      </NumberedSection>
      <ChatterHeading>
        <LargeInfoHeading
          heading={text.landing.joinThe}
          headingFontSize={fontSizes.heading3}
          headingLineHeight={lineHeights.heading3}
          headingColor={color.mediumGrey}
        />
        <LargeInfoHeading
          heading={text.landing.chatter}
          headingFontSize={fontSizes.heading3}
          headingLineHeight={lineHeights.heading3}
          headingColor={color.mediumGrey}
          justifyContent="flex-end"
          headingTransformation="lowercase"
        />
      </ChatterHeading>

      <FooterComponent />
    </>
  );
};
