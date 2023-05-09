import { FC } from "react";
import { CloseIconSVG, CookieIconSVG, text } from "../../assets";
import { useSetAnalyticsConsent } from "../../hooks";
import { SecondaryButton, TertiaryButton } from "../../molecules";
import { BaseIcon, BodyText, Heading6 } from "../../atoms";
import { CookieBannerButtons, CookieBannerContainer, CookieBannerText, CookieBannerWrapper, CookieImage } from "./styles";
import { fonts, fontSizes, fontWeights, spacing } from "../../design";
import { PartialLink } from "../links";
import { routes } from "../../navigation";

export const CookieBanner: FC = () => {
  const setAnalyticsConsent = useSetAnalyticsConsent();

  return (
    <CookieBannerContainer>
      <CookieBannerWrapper>
        <CookieImage src={CookieIconSVG} />
        <BaseIcon src={<CloseIconSVG />} pointer onClick={() => setAnalyticsConsent(false)} alignSelf="flex-start" />
        <CookieBannerText>
          <Heading6>{text.general.cookieBannerTitle}</Heading6>
          <BodyText>
            <PartialLink
              link={routes.cookies}
              linkText={text.general.cookieBannerLinkText}
              preLinkText={text.general.cookieBannerPreHyperLink}
              afterLinkText={text.general.cookieBannerAfterHyperLink}
              font={fonts.primary}
              fontWeight={fontWeights.light}
              fontSize={fontSizes.body}
              lineHeight={fontSizes.body}
              transformText="none"
            />
          </BodyText>
        </CookieBannerText>
        <CookieBannerButtons mobileGap={spacing.md}>
          <SecondaryButton text={text.general.cookieAccept} onClick={() => setAnalyticsConsent(true)} />
          <TertiaryButton text={text.general.cookieReject} onClick={() => setAnalyticsConsent(false)} />
        </CookieBannerButtons>
      </CookieBannerWrapper>
    </CookieBannerContainer>
  );
};
