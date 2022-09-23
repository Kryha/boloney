import { text } from "../../assets";
import { Heading3 } from "../atoms";
import { LogoContainer } from "./styles";

export const Logo = () => {
  return (
    <LogoContainer>
      <Heading3>{text.general.logoHere}</Heading3>
    </LogoContainer>
  );
};
