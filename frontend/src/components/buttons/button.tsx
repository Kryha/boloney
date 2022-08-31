import React, { FC } from "react";
import {} from "../../assets/icons";
import { PrimaryButtonBase, SecondaryButtonBase } from "../atoms";
import { ArrowSection, Ellipse, PrimaryArrow, PrimaryButtonContainer, SecondaryArrow, SecondaryButtonContainer } from "./styles";

interface ButtonProps {
  disabled?: boolean;
  onClick?: void;
  text: string;
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
