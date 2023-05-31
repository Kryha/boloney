import { FC } from "react";
import { TextBoloneyLogoIconSVG } from "../../assets";
import { iconSize } from "../../design";
import { LogoContainer, TextLogoIcon } from "./styles";

interface LogoProps {
  onClick: () => void;
}

/**
 * @description This is the logo component that is displayed in the top left corner of the screen.
 * @param {onClick} - A function to navigate to the home page.
 */

export const Logo: FC<LogoProps> = ({ onClick }) => {
  return (
    <LogoContainer alignItems="center" justifyContent="center">
      <TextLogoIcon src={<TextBoloneyLogoIconSVG />} width={iconSize.fluid} height={iconSize.auto} pointer onClick={() => onClick()} />
    </LogoContainer>
  );
};
