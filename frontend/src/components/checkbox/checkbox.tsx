import { FC } from "react";
import { color } from "../../design";
import { GeneralText, GeneralContentWrapper, Paragraph } from "../atoms";
import { DescriptionContainer } from "../power-up-description/styles";

import { CheckboxContainer, CheckContainer, Close, ToggleSwitchOff, ToggleSwitchOn } from "./styles";

interface Props {
  title: string;
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
      <DescriptionContainer>
        <GeneralContentWrapper>
          <GeneralText>{title}</GeneralText>
          {description && <Paragraph customColor={color.darkGrey}>{description}</Paragraph>}
        </GeneralContentWrapper>
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
