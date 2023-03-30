import { FC } from "react";
import { CookieIcon, text } from "../../assets";
import { useSetAnalyticsConsent } from "../../hooks";
import { GeneralText, Heading6 } from "../atoms";
import { TertiaryButton } from "../buttons";
import { CloseButton } from "../buttons/styles";
import { CookieAcceptButton, CookieBannerButtons, CookieBannerContent, CookieBannerText, CookieBannerWrapper, CookieImage } from "./styles";

export const CookieBanner: FC = () => {
  const setAnalyticsConsent = useSetAnalyticsConsent();

  return (
    <CookieBannerWrapper>
      <CookieBannerContent>
        <CookieImage src={CookieIcon} />
        <CookieBannerText>
          <Heading6>{text.general.cookieBannerTitle}</Heading6>
          <GeneralText>{text.general.cookieBannerText}</GeneralText>
        </CookieBannerText>
        <CloseButton onClick={() => setAnalyticsConsent(false)} />
      </CookieBannerContent>
      <CookieBannerButtons>
        <TertiaryButton primaryText={text.general.cookieReject} onClick={() => setAnalyticsConsent(false)} />
        <CookieAcceptButton primaryText={text.general.cookieAccept} onClick={() => setAnalyticsConsent(true)} />
      </CookieBannerButtons>
    </CookieBannerWrapper>
  );
};
