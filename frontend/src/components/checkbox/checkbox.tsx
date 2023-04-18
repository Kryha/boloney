import { FC } from "react";

import { GeneralContentWrapper, GeneralText, BodyText, CheckboxBox } from "../../atoms";
import { color } from "../../design";
import { CheckboxContainer, DescriptionContainer } from "./styles";

interface Props {
  title?: string;
  description?: string;
  isUsingSwitchIcon?: boolean;
  isTop?: boolean;
  size?: string;

  isChecked: boolean;
  toggleCheck: () => void;
}

export const Checkbox: FC<Props> = ({ title, description, isChecked, toggleCheck, isTop, size }) => {
  return (
    <CheckboxContainer isTop={isTop} onClick={() => toggleCheck()}>
      <CheckboxBox type="checkbox" checked={isChecked} width={size} height={size} />
      <DescriptionContainer>
        <GeneralContentWrapper>
          <GeneralText>{title}</GeneralText>
          {description && <BodyText customcolor={color.darkGrey}>{description}</BodyText>}
        </GeneralContentWrapper>
      </DescriptionContainer>
    </CheckboxContainer>
  );
};
