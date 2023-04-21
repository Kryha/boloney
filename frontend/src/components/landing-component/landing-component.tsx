import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppNameContainer,
  BottomHeading,
  LandingBottomHeading,
  LandingComponentContainer,
  LandingComponentWrapper,
  LandingImage,
  VisibilityContainer,
} from "./styles";
import { MobileLanding } from "./mobile-landing";
import { DesktopLanding } from "./desktop-landing";
import { BoloneyLogoIconSVG, text, CallBoloney } from "../../assets";
import { BaseIcon, LinkText } from "../../atoms";
import { OPEN_LINK_IN_NEW_TAB } from "../../constants";
import { color, iconSize, fonts, fontSizes, fontWeights, lineHeights } from "../../design";
import { useObserver } from "../../hooks";
import { useStore } from "../../store";
import { LandingHeader } from "../landing-header";
import { routes } from "../../navigation";

interface Props {
  isMobile?: boolean;
  isSidebarVisible?: boolean;
  width: number;
  height: number;
}

export const Landing: FC<Props> = ({ isMobile, isSidebarVisible, width, height }) => {
  const { ref, isVisible } = useObserver();
  const setIsSidebarVisible = useStore((state) => state.setIsSidebarVisible);
  const navigate = useNavigate();

  const landing = isMobile ? <MobileLanding /> : <DesktopLanding />;

  useEffect(() => {
    if (isVisible) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isVisible, setIsSidebarVisible]);

  return (
    <LandingComponentWrapper>
      {isMobile && <LandingHeader isSidebarVisible={isSidebarVisible} onClick={() => navigate(routes.login)} />}
      <AppNameContainer>
        <BaseIcon src={<BoloneyLogoIconSVG />} iconColor={color.peach} width={iconSize.xxxl} height={iconSize.auto} />
      </AppNameContainer>
      <BottomHeading>
        <LandingBottomHeading>{text.landing.theUtterlyAbsurdDice}</LandingBottomHeading>
        <LinkText
          href={text.landing.aleoLink}
          target={OPEN_LINK_IN_NEW_TAB}
          font={fonts.secondary}
          fontSize={fontSizes.heading2}
          fontWeight={fontWeights.regular}
          lineHeight={lineHeights.heading2}
          customcolor={color.black}
        >
          {text.landing.aleo}
        </LinkText>
        <LandingBottomHeading>{text.landing.by}</LandingBottomHeading>
        <LinkText
          href={text.landing.kryhaLink}
          target={OPEN_LINK_IN_NEW_TAB}
          font={fonts.secondary}
          fontSize={fontSizes.heading2}
          fontWeight={fontWeights.regular}
          lineHeight={lineHeights.heading2}
          customcolor={color.black}
        >
          {text.landing.kryha}
        </LinkText>
      </BottomHeading>
      <LandingImage src={CallBoloney} alt="boloney" width={width} height={height} />
      <LandingComponentContainer width={width} height={height}>
        <VisibilityContainer ref={ref} />
        {landing}
      </LandingComponentContainer>
    </LandingComponentWrapper>
  );
};
