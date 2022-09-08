import { FC } from "react";
import { PrimaryButtonBase, SecondaryButtonBase } from "../atoms";
import {
  BContainer,
  ButtonContainer,
  CloseButton,
  Ellipsis,
  Exit,
  FirstB,
  Info,
  PrimaryButtonContainer,
  PrimaryButtonText,
  SecondaryArrow,
  SecondaryButtonContainer,
  SecondB,
} from "./styles";

interface ButtonProps {
  disabled?: boolean;
  onClick?: void;
  text?: string;
  isOpen?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

export const PrimaryButton: FC<ButtonProps> = ({ disabled, onClick, text, type = "button" }) => (
  <PrimaryButtonContainer onClick={() => onClick && onClick} disabled={disabled}>
    {/* <PrimaryButtonBase type={type}>
      <PrimaryButtonText>{text}</PrimaryButtonText>
    </PrimaryButtonBase> */}
    <BContainer>
      <FirstB>{"me"}</FirstB>
      <SecondB>{"me"}</SecondB>
    </BContainer>
  </PrimaryButtonContainer>
);

export const SecondaryButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <SecondaryButtonContainer onClick={() => onClick && onClick} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <SecondaryArrow />
  </SecondaryButtonContainer>
);

export const MenuButton: FC<ButtonProps> = ({ disabled, onClick, text, isOpen }) => (
  <ButtonContainer onClick={() => onClick && onClick} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    {isOpen ? <Ellipsis /> : <CloseButton />}
  </ButtonContainer>
);

export const InfoButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <ButtonContainer onClick={() => onClick && onClick} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <Info />
  </ButtonContainer>
);

export const ExitButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <ButtonContainer onClick={() => onClick && onClick} disabled={disabled}>
    <SecondaryButtonBase disabled={disabled}>{text}</SecondaryButtonBase>
    <Exit />
  </ButtonContainer>
);
