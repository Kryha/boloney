import { FC } from "react";

import { text } from "../../assets";
import { buttonSize, color, radius, spacing } from "../../design";
import { TertiaryButton } from "../../molecules";
import { Die } from "../die";
import { SidebarProps } from "../landing-side-bar";
import { NavigationHeader } from "./navigation-header";
import { LandingButton } from "./styles";

export interface LandingHeaderProps extends SidebarProps {
  onClick: () => void;
}

export const LandingHeader: FC<LandingHeaderProps> = ({ isSidebarVisible, onClick }) => {
  if (isSidebarVisible) return <NavigationHeader onClick={onClick} />;

  return (
    <LandingButton>
      <TertiaryButton
        onClick={onClick}
        text={text.general.playNow}
        icon={<Die iconColor={color.transparent} pipColor={color.black} borderColor={color.black} radius={radius.none} />}
        backgroundColor={color.lightGrey}
        gap={spacing.s}
        padding={buttonSize.xs}
      />
    </LandingButton>
  );
};
