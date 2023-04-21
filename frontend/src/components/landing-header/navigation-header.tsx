import { FC } from "react";

import { text, TextBoloneyLogoIconSVG } from "../../assets";
import { BaseIcon } from "../../atoms";
import { buttonSize, color, iconSize, radius, spacing } from "../../design";
import { TertiaryButton } from "../../molecules";
import { Die } from "../die";
import { LandingHeaderProps } from "./landing-header";
import { LandingHeaderWrapper, TextLogoWrapper } from "./styles";

export const NavigationHeader: FC<LandingHeaderProps> = ({ onClick }) => {
  return (
    <LandingHeaderWrapper>
      <TextLogoWrapper>
        <BaseIcon src={<TextBoloneyLogoIconSVG />} width={iconSize.auto} height={iconSize.fluid} />
      </TextLogoWrapper>
      <TertiaryButton
        onClick={onClick}
        text={text.general.playNow}
        icon={<Die iconColor={color.transparent} pipColor={color.black} borderColor={color.black} radius={radius.none} />}
        backgroundColor={color.lightGrey}
        gap={spacing.s}
        padding={buttonSize.xs}
      />
    </LandingHeaderWrapper>
  );
};
