import { FC } from "react";

import {
  CheckboxContainer,
  CheckContainer,
  Close,
  Description,
  DescriptionContainer,
  Title,
  ToggleSwitchOff,
  ToggleSwitchOn,
} from "./styles";

interface Props {
  title: string;
  description?: string;
  isUsingSwitchIcon?: boolean;

  isChecked: boolean;
  toggleCheck: () => void;
}

export const Checkbox: FC<Props> = ({ title, description, isChecked, toggleCheck, isUsingSwitchIcon }) => {
  const check = () => {
    if (isUsingSwitchIcon) {
      if (isChecked) return <ToggleSwitchOn />;
      return <ToggleSwitchOff />;
    } else {
      if (isChecked) return <Close />;
      return <></>;
    }
  };

  return (
    <CheckboxContainer>
      <CheckContainer onClick={() => toggleCheck()}>{check()}</CheckContainer>
      <DescriptionContainer removeLeftBorder={isUsingSwitchIcon}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
