import { FC } from "react";

import { CheckboxContainer, CheckContainer, Close, Description, DescriptionContainer, Title } from "./styles";

interface Props {
  title: string;
  description?: string;

  isChecked: boolean;
  toggleCheck: () => void;
}

export const Checkbox: FC<Props> = ({ title, description, isChecked, toggleCheck }) => {
  return (
    <CheckboxContainer>
      <CheckContainer onClick={() => toggleCheck()}>{isChecked && <Close />}</CheckContainer>
      <DescriptionContainer>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
