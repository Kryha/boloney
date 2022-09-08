import React, { FC } from "react";
import {} from "../../assets/icons";
import { PrimaryButtonBase, SecondaryButtonBase } from "../atoms";
import {
  ArrowSection,
  ButtonContainer,
  CloseButton,
  Ellipse,
  Ellipsis,
  Exit,
  Info,
  PrimaryArrow,
  PrimaryButtonContainer,
  SecondaryArrow,
  SecondaryButtonContainer,
} from "./styles";

interface ButtonProps {
  disabled?: boolean;
  onClick?: void;
  text: string;
  isOpen?: boolean;
}

export const PrimaryButton: FC<ButtonProps> = ({ disabled, onClick, text }) => (
  <PrimaryButtonContainer onClick={() => onClick && onClick} disabled={disabled}>
    <PrimaryButtonBase disabled={disabled}>{text}</PrimaryButtonBase>
    <ArrowSection>
      <PrimaryArrow />
      <PrimaryArrow />
    </ArrowSection>
    <Ellipse />
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
