import { FC, ReactNode } from "react";
import { color } from "../../design";
import { PrimaryButtonBase, SecondaryButtonBase } from "../atoms";
import { Tooltip, InfoPosition } from "../tooltip";
import {
  ButtonContainer,
  CloseButton,
  Exit,
  InitialButtonView,
  LeftArrow,
  LinkContainer,
  LinkText,
  PrimaryButtonContainer,
  PrimaryButtonText,
  PrimaryButtonWrapper,
  RightButtonContainer,
  SecondaryArrow,
  SecondaryButtonContainer,
  SecondaryView,
} from "./styles";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  primaryText?: string;
  secondaryText?: string;
  isOpen?: boolean;
  type?: "button" | "submit" | "reset";
  tooltipTitle?: string;
  tooltipInfo?: string;
  tooltipInfoPosition?: InfoPosition;
}

interface DropdownButtonProps extends ButtonProps {
  icon: ReactNode;
}

export const PrimaryButton: FC<ButtonProps> = ({ disabled, onClick, primaryText, secondaryText, type = "button" }) => {
  return (
    <PrimaryButtonWrapper onClick={() => onClick && onClick()} disabled={disabled}>
      <PrimaryButtonContainer disabled={disabled}>
        <InitialButtonView>
          <PrimaryButtonBase type={type} disabled={disabled}>
            <PrimaryButtonText>{primaryText}</PrimaryButtonText>
          </PrimaryButtonBase>
        </InitialButtonView>
        <SecondaryView>
          <PrimaryButtonBase type={type} backgroundColor={color.black} disabled={disabled}>
            <PrimaryButtonText customColor={color.white}>{secondaryText ? secondaryText : primaryText}</PrimaryButtonText>
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

export const Link: FC<ButtonProps> = ({ disabled, onClick, primaryText }) => (
  <LinkContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <LinkText>{primaryText}</LinkText>
  </LinkContainer>
);

export const GoBackButton: FC<ButtonProps> = ({ disabled, onClick, primaryText }) => (
  <SecondaryButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <LeftArrow />
    <SecondaryButtonBase disabled={disabled}>{primaryText}</SecondaryButtonBase>
  </SecondaryButtonContainer>
);
