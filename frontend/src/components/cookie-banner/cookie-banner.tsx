import { FC } from "react";
import { CloseIconSVG, CookieIconSVG, text } from "../../assets";
import { useSetAnalyticsConsent } from "../../hooks";
import { SecondaryButton, TertiaryButton } from "../../molecules";
import { BaseIcon, BodyText, Heading6 } from "../../atoms";
import { CookieBannerButtons, CookieBannerContainer, CookieBannerText, CookieBannerWrapper, CookieImage } from "./styles";
import { spacing } from "../../design";

export const CookieBanner: FC = () => {
  const setAnalyticsConsent = useSetAnalyticsConsent();

  return (
    <CookieBannerContainer>
      <CookieBannerWrapper>
        <CookieImage src={CookieIconSVG} />
        <BaseIcon src={<CloseIconSVG />} cursor onClick={() => setAnalyticsConsent(false)} alignSelf="flex-start" />
        <CookieBannerText>
          <Heading6>{text.general.cookieBannerTitle}</Heading6>
          <BodyText>{text.general.cookieBannerText}</BodyText>
        </CookieBannerText>
        <CookieBannerButtons mobileGap={spacing.md}>
          <SecondaryButton text={text.general.cookieAccept} onClick={() => setAnalyticsConsent(true)} />
          <TertiaryButton text={text.general.cookieReject} onClick={() => setAnalyticsConsent(false)} />
        </CookieBannerButtons>
      </CookieBannerWrapper>
    </CookieBannerContainer>
  );
};
