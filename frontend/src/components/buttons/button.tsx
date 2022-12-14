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
  SecondaryArrow,
  SecondaryButtonContainer,
  SecondaryView,
} from "./styles";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
  isOpen?: boolean;
  type?: "button" | "submit" | "reset";
  tooltipTitle?: string;
  tooltipInfo?: string;
  tooltipInfoPosition?: InfoPosition;
}

interface DropdownButtonProps extends ButtonProps {
  icon: ReactNode;
}

export const PrimaryButton: FC<ButtonProps> = ({ disabled, onClick, text, type = "button" }) => (
  <PrimaryButtonWrapper onClick={() => onClick && onClick()} disabled={disabled}>
    <PrimaryButtonContainer disabled={disabled}>
      <InitialButtonView>
        <PrimaryButtonBase type={type} disabled={disabled}>
          <PrimaryButtonText>{text}</PrimaryButtonText>
        </PrimaryButtonBase>
      </InitialButtonView>
      <SecondaryView>
        <PrimaryButtonBase type={type} backgroundColor={color.black} disabled={disabled}>
          <PrimaryButtonText customColor={color.white}>{text}</PrimaryButtonText>
        </PrimaryButtonBase>
      </SecondaryView>
    </PrimaryButtonContainer>
  </PrimaryButtonWrapper>
);

export const SecondaryButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <SecondaryButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <SecondaryArrow />
  </SecondaryButtonContainer>
);

export const DropdownButton: FC<DropdownButtonProps> = ({ disabled, onClick, text, isOpen, icon }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    {isOpen ? <CloseButton /> : icon}
  </ButtonContainer>
);

export const InfoButton: FC<ButtonProps> = ({ disabled, onClick, text, tooltipInfoPosition, tooltipTitle, tooltipInfo }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <Tooltip title={tooltipTitle} info={tooltipInfo} infoPosition={tooltipInfoPosition} />
  </ButtonContainer>
);

export const ExitButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <Exit />
  </ButtonContainer>
);

export const Link: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <LinkContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <LinkText>{text}</LinkText>
  </LinkContainer>
);

export const GoBackButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <SecondaryButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <LeftArrow />
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
  </SecondaryButtonContainer>
);
