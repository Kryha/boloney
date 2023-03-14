import { FC } from "react";
import { GeneralText, GeneralContentWrapper } from "../atoms";

import { CheckboxContainer, CheckContainer, Close, Description, DescriptionContainer } from "./styles";

interface Props {
  title?: string;
  description?: string;
  isUsingSwitchIcon?: boolean;
  isTop?: boolean;

  isChecked: boolean;
  toggleCheck: () => void;
}

export const Checkbox: FC<Props> = ({ title, description, isChecked, toggleCheck, isTop }) => {
  const check = () => {
    if (isChecked) return <Close />;
    return <></>;
  };

  return (
    <CheckboxContainer isTop={isTop} onClick={() => toggleCheck()}>
      <CheckContainer>{check()}</CheckContainer>
      <DescriptionContainer>
        <GeneralContentWrapper>
          <GeneralText>{title}</GeneralText>
          {description && <Description>{description}</Description>}
        </GeneralContentWrapper>
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
