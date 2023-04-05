import { FC, ReactNode, useState, useEffect } from "react";
import { color, FontProps, TransformText } from "../../design";
import { useObserver } from "../../hooks";
import { useStore } from "../../store";
import { PrimaryButtonBase, SecondaryButtonBase, LinkText, PrimaryButtonText } from "../atoms";
import { ContentLoader } from "../content-loader";
import { Tooltip, InfoPosition } from "../tooltip";
import {
  ButtonContainer,
  CloseButton,
  Exit,
  InitialButtonView,
  LeftArrow,
  LinkContainer,
  PrimaryButtonContainer,
  PrimaryButtonWrapper,
  RightButtonContainer,
  SecondaryArrow,
  SecondaryButtonContainer,
  SecondaryView,
  TertiaryButtonContainer,
} from "./styles";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  primaryText?: string;
  secondaryText?: string;
  isOpen?: boolean;
  buttonType?: "button" | "submit" | "reset";
  tooltipTitle?: string;
  tooltipInfo?: string;
  tooltipInfoPosition?: InfoPosition;
  width?: number;
  isLoading?: boolean;
  isBottomButton?: boolean;
  isSpinnerShown?: boolean;
}

interface LinkProps extends ButtonProps {
  customcolor?: string;
  fontWeight?: string;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  font?: string;
  transformText?: TransformText;
}

interface DropdownButtonProps extends ButtonProps {
  icon: ReactNode;
}

export const PrimaryButton: FC<ButtonProps> = ({
  disabled,
  onClick,
  primaryText,
  secondaryText,
  buttonType = "button",
  width,
  isLoading,
  isBottomButton,
  isSpinnerShown,
}) => {
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);
  const [showSpinner, setShowSpinner] = useState(false);
  const contentLoader = isLoadingSpinnerVisible || isLoading;
  const loading = contentLoader && showSpinner;

  const handleClick = () => {
    onClick && onClick();
    setShowSpinner(true);
  };

  const { ref, isVisible } = useObserver();
  const setBottomButtonVisible = useStore((state) => state.setBottomButtonVisible);

  useEffect(() => {
    if (isBottomButton) setBottomButtonVisible(isVisible);
    if (isSpinnerShown) setShowSpinner(true);
  }, [isBottomButton, isVisible, setBottomButtonVisible, isSpinnerShown]);

  return (
    <PrimaryButtonWrapper onClick={() => handleClick()} disabled={disabled} ref={ref}>
      <PrimaryButtonContainer disabled={disabled} width={width} isLoading={loading}>
        <InitialButtonView>
          <PrimaryButtonBase type={buttonType} disabled={disabled} isLoading={loading}>
            <PrimaryButtonText>{primaryText}</PrimaryButtonText>
            {loading && <ContentLoader loading={loading} />}
          </PrimaryButtonBase>
        </InitialButtonView>
        <SecondaryView className="box">
          <PrimaryButtonBase type={buttonType} backgroundColor={color.black} disabled={disabled} isLoading={loading}>
            <PrimaryButtonText customcolor={color.white}>{secondaryText ? secondaryText : primaryText}</PrimaryButtonText>
          </PrimaryButtonBase>
        </SecondaryView>
      </PrimaryButtonContainer>
    </PrimaryButtonWrapper>
  );
};

export const SecondaryButton: FC<ButtonProps> = ({ disabled, onClick, primaryText }) => (
  <SecondaryButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{primaryText}</SecondaryButtonBase>
    <SecondaryArrow />
  </SecondaryButtonContainer>
);

export const TertiaryButton: FC<ButtonProps> = ({ disabled, onClick, primaryText }) => (
  <TertiaryButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{primaryText}</SecondaryButtonBase>
  </TertiaryButtonContainer>
);

export const DropdownButton: FC<DropdownButtonProps> = ({ disabled, onClick, primaryText, isOpen, icon }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{primaryText}</SecondaryButtonBase>
    {isOpen ? <CloseButton /> : icon}
  </ButtonContainer>
);

export const InfoButton: FC<ButtonProps> = ({ disabled, onClick, primaryText, tooltipInfoPosition, tooltipTitle, tooltipInfo }) => (
  <RightButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{primaryText}</SecondaryButtonBase>
    <Tooltip title={tooltipTitle} info={tooltipInfo} infoPosition={tooltipInfoPosition} />
  </RightButtonContainer>
);

export const ExitButton: FC<ButtonProps> = ({ disabled, onClick, primaryText }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{primaryText}</SecondaryButtonBase>
    <Exit />
  </ButtonContainer>
);

export const Link: FC<LinkProps> = ({
  disabled,
  onClick,
  primaryText,
  customcolor,
  fontWeight,
  fontSize,
  lineHeight,
  font,
  transformText,
}) => (
  <LinkContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <LinkText
      customcolor={customcolor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      lineHeight={lineHeight}
      font={font}
      transformText={transformText}
    >
      {primaryText}
    </LinkText>
  </LinkContainer>
);

export const GoBackButton: FC<ButtonProps> = ({ disabled, onClick, primaryText }) => (
  <SecondaryButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <LeftArrow />
    <SecondaryButtonBase disabled={disabled}>{primaryText}</SecondaryButtonBase>
  </SecondaryButtonContainer>
);
