import { FC } from "react";
import { CallBoloney, text } from "../../assets";
import { BaseRow, Heading1, LinkText } from "../../atoms";
import { fonts, fontSizes, fontWeights } from "../../design";
import { ParagraphDescription, PrimaryButton } from "../../molecules";
import { Footer } from "../footer";
import { ContactWrapper, ContactImage, ContentWrapper, LinkWrapper } from "./styles";

interface ContactProps {
  handleBugFormClick: () => void;
  handleFeedbackFormClick: () => void;
}

export const Contact: FC<ContactProps> = ({ handleBugFormClick, handleFeedbackFormClick }) => {
  const textProps = {
    headingFont: fonts.secondary,
    headingFontWeight: fontWeights.regular,
    headingFontSize: fontSizes.heading4,
    headingLineHeight: fontSizes.heading4,
    subheadingFont: fonts.primary,
    subheadingFontWeight: fontWeights.light,
    subheadingFontSize: fontSizes.heading5,
    subheadingLineHeight: fontSizes.heading5,
  };
  return (
    <ContactWrapper>
      <ContentWrapper>
        <Heading1>{text.contact.contactUs}</Heading1>
        <ContactImage src={CallBoloney} alt="boloney" />

        <ParagraphDescription heading={text.contact.alreadyPlayed} subheading={text.contact.tellUsAboutYourExperience} {...textProps} />

        <PrimaryButton primaryText={text.contact.shareFeedback} onClick={handleFeedbackFormClick} />

        <ParagraphDescription heading={text.contact.spottedBug} subheading={text.contact.tellUsAboutBug} {...textProps} />
        <PrimaryButton primaryText={text.contact.spottedBug} onClick={handleBugFormClick} />

        <ParagraphDescription heading={text.contact.wantToSayHi} subheading={text.contact.doYouHaveQuestions} {...textProps} />

        <LinkWrapper>
          <LinkText
            href={text.landing.boloneyHelpEmail}
            fontSize={fontSizes.heading5}
            lineHeight={fontSizes.heading5}
            fontWeight={fontWeights.light}
            font={fonts.primary}
          >
            {text.contact.sendEmail}
          </LinkText>
        </LinkWrapper>
      </ContentWrapper>

      <BaseRow justifyContent="space-around">
        <Footer />
      </BaseRow>
    </ContactWrapper>
  );
};
