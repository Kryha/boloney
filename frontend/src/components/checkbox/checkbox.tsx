import { FC } from "react";
import { GeneralText, GeneralContentWrapper } from "../atoms";

import { CheckboxContainer, CheckContainer, Close, Description, DescriptionContainer, ToggleSwitchOff, ToggleSwitchOn } from "./styles";

interface Props {
  title?: string;
  description?: string;
  isUsingSwitchIcon?: boolean;
  isTop?: boolean;

  isChecked: boolean;
  toggleCheck: () => void;
}

export const Checkbox: FC<Props> = ({ title, description, isChecked, toggleCheck, isUsingSwitchIcon, isTop }) => {
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
    <CheckboxContainer isTop={isTop} onClick={() => toggleCheck()} addHover={isUsingSwitchIcon}>
      <CheckContainer>{check()}</CheckContainer>
      <DescriptionContainer removeLeftBorder={isUsingSwitchIcon}>
        <GeneralContentWrapper>
          <GeneralText>{title}</GeneralText>
          {description && <Description>{description}</Description>}
        </GeneralContentWrapper>
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
