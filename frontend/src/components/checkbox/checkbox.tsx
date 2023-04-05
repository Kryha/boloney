import { FC } from "react";

import { GeneralContentWrapper, GeneralText, BodyText } from "../atoms";
import { color } from "../../design";
import { CheckboxContainer, CheckContainer, Close, DescriptionContainer } from "./styles";

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
          {description && <BodyText customcolor={color.darkGrey}>{description}</BodyText>}
        </GeneralContentWrapper>
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
