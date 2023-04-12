import { TextBoloneyLogoIconSVG } from "../../assets";
import { iconSize } from "../../design";
import { LogoContainer, TextLogoIcon } from "./styles";

export const Logo = () => {
  return (
    <LogoContainer>
      <TextLogoIcon src={<TextBoloneyLogoIconSVG />} width={iconSize.fluid} height={iconSize.auto} />
    </LogoContainer>
  );
};
