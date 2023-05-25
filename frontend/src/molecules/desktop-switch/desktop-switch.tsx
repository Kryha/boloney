import { FC } from "react";

import { CallBoloney, text, TextBoloneyLogoIconSVG } from "../../assets";
import { BaseIcon, FluidImage, Heading2, Heading4 } from "../../atoms";
import { fontSizes, lineHeights, mobileHeight, mobileWidth, spacing } from "../../design";
import { DesktopSwitchWrapper, MobileColumn, MobileContainerWrapper, TextLogoContainer } from "./styles";

interface Props {
  onClick: () => void;
}

/* This component is used in the mobile version of the application. It indicates that there is no desktop version.
 * @param {Function} onClick - This function is used on the boloney logo, so that you are able to navigate to another route.
 */

export const MobileDesktopSwitch: FC<Props> = ({ onClick }) => {
  return (
    <>
      <TextLogoContainer>
        <BaseIcon src={<TextBoloneyLogoIconSVG />} width={mobileWidth.xs} height={mobileHeight.fluid} onClick={onClick} pointer />
      </TextLogoContainer>
      <MobileContainerWrapper gap={spacing.sm} alignItems="center" justifyContent="center">
        <DesktopSwitchWrapper>
          <MobileColumn gap={spacing.sm}>
            <Heading2 fontSize={fontSizes.heading2B} lineHeight={lineHeights.heading2B}>
              {text.general.boloneyIsBestOnDesktop}
            </Heading2>
            <Heading4>{text.general.forNowThereIsNoMobileVersion}</Heading4>
            <Heading4>{text.general.pleaseSwitchToDesktop}</Heading4>
          </MobileColumn>
        </DesktopSwitchWrapper>
        <FluidImage src={CallBoloney} />
      </MobileContainerWrapper>
    </>
  );
};
