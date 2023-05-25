import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorContainer } from "./styles";
import { text, LeftArrowIconSVG } from "../../assets";
import { routes } from "../../navigation";
import { GO_BACK } from "../../constants";
import { Heading2, BodyText, BaseRow, BaseColumn } from "../../atoms";
import { MobileDesktopSwitch, PrimaryButton, TertiaryButton } from "../../molecules";
import { useIsMobile } from "../../hooks";
import { spacing } from "../../design";
import { EqualLayout } from "../../molecules/base-layout";

interface ErrorViewProps {
  headingText?: string;
  descriptionText?: string;
  navigationText?: string;
  redirectRoute?: string;
  onButtonClick?: () => void;
}

export const ErrorView: FC<ErrorViewProps> = ({ redirectRoute, headingText, navigationText, onButtonClick, descriptionText }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleButtonClick = () => {
    if (onButtonClick) return onButtonClick();
    navigate(redirectRoute || routes.root);
  };

  if (isMobile) return <EqualLayout mainSection={<MobileDesktopSwitch onClick={() => navigate(routes.root)} />} />;

  return (
    <ErrorContainer>
      <BaseColumn gap={spacing.md}>
        <Heading2>{headingText || text.error.pageNotFound}</Heading2>
        <BodyText>{descriptionText || text.error.sorrySomethingWentWrong}</BodyText>
        <BaseRow gap={spacing.xs}>
          <TertiaryButton
            text={text.general.goBack}
            onClick={() => navigate(GO_BACK)}
            icon={<LeftArrowIconSVG />}
            iconPosition="row-reverse"
          />
          <PrimaryButton onClick={() => handleButtonClick()} primaryText={text.error.goHome || navigationText} />
        </BaseRow>
      </BaseColumn>
    </ErrorContainer>
  );
};
