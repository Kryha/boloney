import { FC } from "react";
import { CloseIconSVG } from "../../assets";
import { BaseColumn, BaseIcon, FluidImage } from "../../atoms";
import { containerHeight, images, popUpWidth, spacing } from "../../design";
import { SecondaryButton, TertiaryButton } from "../buttons";
import { NotificationHeading } from "../text";
import { BannerButtonContainer, BannerContentWrapper, BannerImageContainer, BannerPopUp, BannerWrapper } from "./styles";

interface Props {
  subheading?: string;
  heading?: string;
  subheadingColor?: string;
  headingColor?: string;
  img?: string;
  secondaryButtonText?: string;
  tertiaryButtonText?: string;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} subheading - subheading / general text
 * @param {string} heading - The main heading
 * @param {string} subheadingColor - color for the subheading / general text
 * @param {string} headingColor - color for the heading text
 * @param {string} img - the image for the cookie banner
 */

export const CookieBanner: FC<Props> = ({
  subheading,
  heading,
  subheadingColor,
  headingColor,
  img,
  secondaryButtonText,
  tertiaryButtonText,
}) => {
  return (
    <BaseColumn>
      <BannerPopUp height="fit-content" padding={spacing.sm} width={popUpWidth.md}>
        <BannerWrapper gap={spacing.s}>
          <BannerImageContainer alignItems="flex-end">
            <FluidImage src={img} height={images.fluid} width={popUpWidth.xxs} maxHeight={containerHeight.xl} />
            <BaseIcon src={<CloseIconSVG />} alignSelf="flex-start" pointer />
          </BannerImageContainer>
          <BannerContentWrapper justifyContent="space-between" gap={spacing.s}>
            <NotificationHeading heading={heading} headingColor={headingColor} subheading={subheading} subheadingColor={subheadingColor} />
            <BaseIcon src={<CloseIconSVG />} alignSelf="flex-start" pointer />
          </BannerContentWrapper>
        </BannerWrapper>
        <BannerButtonContainer alignItems="flex-end" justifyContent="flex-end" gap={spacing.sm}>
          <SecondaryButton text={secondaryButtonText} />
          <TertiaryButton text={tertiaryButtonText} />
        </BannerButtonContainer>
      </BannerPopUp>
    </BaseColumn>
  );
};
