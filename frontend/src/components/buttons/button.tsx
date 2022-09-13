import { FC } from "react";
import { color } from "../../design";
import { PrimaryButtonBase, SecondaryButtonBase } from "../atoms";
import {
  ButtonContainer,
  CloseButton,
  Ellipsis,
  Exit,
  Info,
  InitialButtonView,
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

export const MenuButton: FC<ButtonProps> = ({ disabled, onClick, text, isOpen }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    {isOpen ? <Ellipsis /> : <CloseButton />}
  </ButtonContainer>
);

export const InfoButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <Info />
  </ButtonContainer>
);

export const ExitButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <ButtonContainer onClick={() => onClick && onClick()} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <Exit />
  </ButtonContainer>
);

export const Link: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  // <LinkContainer onClick={() => onClick && onClick()} disabled={disabled}>
  <LinkText>{text}</LinkText>
  // </LinkContainer>
);
