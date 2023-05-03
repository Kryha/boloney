import { FC } from "react";
import { CallBoloney, text } from "../../assets";
import { Heading1, Heading4, Heading5 } from "../../atoms";
import { fonts, fontSizes, fontWeights } from "../../design";
import { PrimaryButton } from "../../molecules";
import { FooterComponent } from "../footer-component";
import { GeneralLink } from "../links";
import { TopNavigation } from "../top-navigation";
import { ButtonWrapper, ContactWrapper, ContactImage, ContentWrapper, NavigationContainer } from "./styles";

interface Props {
  isMobile: boolean;
}

export const ContactComponent: FC<Props> = ({ isMobile }) => {
  return (
    <>
      <NavigationContainer>
        <TopNavigation location="landing" />
      </NavigationContainer>
      <ContactWrapper>
        <ContentWrapper>
          <Heading1>{text.contact.contactUs}</Heading1>
          <ContactImage src={CallBoloney} alt="boloney" />
          <Heading4>{text.contact.alreadyPlayed}</Heading4>
          <Heading5 font={fonts.primary} fontWeight={fontWeights.light}>
            {text.contact.tellUsAboutYourExperience}
          </Heading5>
          {/* TODO: add onClick func */}
          <ButtonWrapper>
            <PrimaryButton primaryText={text.general.inProgress} onClick={() => ({})} />
          </ButtonWrapper>

          <Heading4>{text.contact.spottedBug}</Heading4>
          <Heading5 font={fonts.primary} fontWeight={fontWeights.light}>
            {text.contact.tellUsAboutBug}
          </Heading5>
          <ButtonWrapper>
            <PrimaryButton primaryText={text.general.inProgress} onClick={() => ({})} />
          </ButtonWrapper>

          {/* TODO: add onClick func */}
          <Heading4>{text.contact.wantToSayHi}</Heading4>
          <Heading5 font={fonts.primary} fontWeight={fontWeights.light}>
            {text.contact.doYouHaveQuestions}
          </Heading5>
          <GeneralLink
            link={text.landing.boloneyHelpEmail}
            linkText={text.contact.sendEmail}
            font={fonts.primary}
            fontWeight={fontWeights.light}
            fontSize={fontSizes.heading5}
            lineHeight={fontSizes.heading5}
          />
        </ContentWrapper>

        <FooterComponent isMobile={isMobile} />
      </ContactWrapper>
    </>
  );
};
