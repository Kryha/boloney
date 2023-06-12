import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { GeneralContentWrapper, Heading1, Heading4 } from "../../atoms";
import { Logo } from "../../components";
import { useQueryParams, useViewport } from "../../hooks";
import { BaseLayout, PrimaryButton } from "../../molecules";
import { routes } from "../../navigation";
import { useSession } from "../../store";
import { ButtonContainer, WelcomeContainer } from "./styles";

const Welcome = () => {
  const query = useQueryParams();
  const session = useSession();
  const navigate = useNavigate();
  const { width, height } = useViewport();

  if (!session?.username) return <></>;

  const newUser = query.get("newUser") === "true" ? true : false;

  const h4Text = newUser ? text.authForm.welcome(session.username) : text.authForm.welcomeBack(session.username);

  return (
    <WelcomeContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.readyToBluff}</Heading1>
        <Heading4>{h4Text}</Heading4>
      </GeneralContentWrapper>

      <ButtonContainer width={width} height={height}>
        <PrimaryButton primaryText={text.authForm.letsRoll} onClick={() => navigate(routes.home)} />
      </ButtonContainer>
    </WelcomeContainer>
  );
};

export const WelcomePage = () => {
  return <BaseLayout leftSection={<Logo />} mainSection={<Welcome />} />;
};
