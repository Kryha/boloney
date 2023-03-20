import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonContainer, ErrorContainer, InformationContainer } from "./styles";
import { text } from "../../assets/text";
import { routes } from "../../navigation";
import { GO_BACK } from "../../constants";
import { PrimaryButton, SecondaryButton } from "../buttons";
import { Heading2, BodyText } from "../atoms";

interface ErrorViewProps {
  headingText?: string;
  descriptionText?: string;
  navigationText?: string;
  redirectRoute?: string;
  onButtonClick?: () => void;
}

// TODO: update component
export const ErrorView: FC<ErrorViewProps> = ({ redirectRoute, headingText, navigationText, onButtonClick, descriptionText }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) return onButtonClick();
    navigate(redirectRoute || routes.root);
  };

  return (
    <ErrorContainer>
      <InformationContainer>
        <Heading2>{headingText || text.error.pageNotFound}</Heading2>
        <BodyText>{descriptionText || text.error.sorrySomethingWentWrong}</BodyText>
        <ButtonContainer>
          <SecondaryButton onClick={() => navigate(GO_BACK)} primaryText={text.error.goBack} />
          <PrimaryButton onClick={() => handleButtonClick()} primaryText={text.error.goHome || navigationText} />
        </ButtonContainer>
      </InformationContainer>
    </ErrorContainer>
  );
};
