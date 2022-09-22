import { FC } from "react";

import { CheckboxContainer, CheckContainer, Close, Description, DescriptionContainer, Title } from "./styles";

interface Props {
  title: string;
  description?: string;

  isChecked: boolean;
}

export const Checkbox: FC<Props> = ({ title, description, isChecked }) => {
  return (
    <CheckboxContainer>
      <CheckContainer>{isChecked && <Close />}</CheckContainer>
      <DescriptionContainer>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
