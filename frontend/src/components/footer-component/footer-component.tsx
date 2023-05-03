import { FC } from "react";
import { text } from "../../assets";
import { fonts, fontSizes, fontWeights, spacing } from "../../design";
import { routes } from "../../navigation";
import { GeneralLink, SocialMediaImageLinks, WebsiteLink } from "../links";
import { FooterWrapper, LinkWrapper } from "./styles";

interface Props {
  isMobile: boolean;
}

// TODO: Reuse this component reusable for other views e.g. Landing.
export const FooterComponent: FC<Props> = ({ isMobile }) => {
  return (
    <FooterWrapper isMobile={isMobile} mobileGap={spacing.xxl} alignItems="flex-start" gap={spacing.lg}>
      <SocialMediaImageLinks />
      {/* TODO: Change links. */}
      <LinkWrapper>
        <GeneralLink
          heading={text.contact.importantThings}
          link={routes.privacy}
          linkText={text.contact.privacyPolicy}
          fontSize={fontSizes.heading5}
          lineHeight={fontSizes.heading5}
          font={fonts.primary}
          fontWeight={fontWeights.lighter}
          isWebsite
        />
        <WebsiteLink
          link={routes.termsOfUse}
          linkText={text.contact.termsAndConditions}
          fontSize={fontSizes.heading5}
          lineHeight={fontSizes.heading5}
          font={fonts.primary}
          fontWeight={fontWeights.lighter}
        />
      </LinkWrapper>
      <LinkWrapper>
        <GeneralLink
          heading={text.contact.comeSayHi}
          link={routes.contact}
          linkText={text.contact.contactUs}
          fontSize={fontSizes.heading5}
          lineHeight={fontSizes.heading5}
          font={fonts.primary}
          fontWeight={fontWeights.lighter}
          isWebsite
          isSelfTarget
        />
      </LinkWrapper>
    </FooterWrapper>
  );
};
