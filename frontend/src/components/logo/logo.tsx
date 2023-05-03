import { useNavigate } from "react-router-dom";
import { TextBoloneyLogoIconSVG } from "../../assets";
import { iconSize } from "../../design";
import { routes } from "../../navigation";
import { useSession } from "../../store";
import { LogoContainer, TextLogoIcon } from "./styles";

export const Logo = () => {
  const session = useSession();
  const navigate = useNavigate();
  const route = session ? routes.home : routes.login;

  return (
    <LogoContainer>
      <TextLogoIcon src={<TextBoloneyLogoIconSVG />} width={iconSize.fluid} height={iconSize.auto} cursor onClick={() => navigate(route)} />
    </LogoContainer>
  );
};
