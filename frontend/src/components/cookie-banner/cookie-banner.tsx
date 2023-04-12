import { FC } from "react";
import { CloseIconSVG, CookieIconSVG, text } from "../../assets";
import { useSetAnalyticsConsent } from "../../hooks";
import { BaseIcon, GeneralText, Heading6 } from "../atoms";
import { TertiaryButton } from "../buttons";
import {
  CloseIconWrapper,
  CookieAcceptButton,
  CookieBannerButtons,
  CookieBannerContent,
  CookieBannerText,
  CookieBannerWrapper,
  CookieImage,
} from "./styles";

export const CookieBanner: FC = () => {
  const setAnalyticsConsent = useSetAnalyticsConsent();

  return (
    <CookieBannerWrapper>
      <CookieBannerContent>
        <CookieImage src={CookieIconSVG} />
        <CookieBannerText>
          <Heading6>{text.general.cookieBannerTitle}</Heading6>
          <GeneralText>{text.general.cookieBannerText}</GeneralText>
        </CookieBannerText>
        <CloseIconWrapper onClick={() => setAnalyticsConsent(false)}>
          <BaseIcon src={<CloseIconSVG />} cursor />
        </CloseIconWrapper>
      </CookieBannerContent>
      <CookieBannerButtons>
        <TertiaryButton primaryText={text.general.cookieReject} onClick={() => setAnalyticsConsent(false)} />
        <CookieAcceptButton primaryText={text.general.cookieAccept} onClick={() => setAnalyticsConsent(true)} />
      </CookieBannerButtons>
    </CookieBannerWrapper>
  );
};
