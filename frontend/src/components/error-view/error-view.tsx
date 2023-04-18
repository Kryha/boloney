import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonContainer, ErrorContainer, InformationContainer } from "./styles";
import { text } from "../../assets/text";
import { routes } from "../../navigation";
import { GO_BACK } from "../../constants";
import { Heading2, BodyText } from "../../atoms";
import { PrimaryButton, TertiaryButton } from "../../molecules";
import { LeftArrowIconSVG } from "../../assets";

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
          <TertiaryButton
            text={text.general.goBack}
            onClick={() => navigate(GO_BACK)}
            icon={<LeftArrowIconSVG />}
            iconPosition="row-reverse"
          />
          <PrimaryButton onClick={() => handleButtonClick()} primaryText={text.error.goHome || navigationText} />
        </ButtonContainer>
      </InformationContainer>
    </ErrorContainer>
  );
};
