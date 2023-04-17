import { FC, ReactNode } from "react";
import { buttonSize } from "../../design";
import { TertiaryButton } from "../../molecules";

import { ChildrenContainer, ButtonContainer, DropdownWrapper } from "./styles";

interface Props {
  children: ReactNode;
  isActive: boolean;
  isInMatch?: boolean;
  buttonIcon: ReactNode;
  buttonText: string;

  expand: () => void;
  setHover?: (hover: boolean) => void;
}

export const Dropdown: FC<Props> = ({ setHover, isActive, expand, children, buttonText, buttonIcon, isInMatch }) => {
  return (
    <DropdownWrapper>
      <ButtonContainer
        isActive={isActive}
        onClick={() => expand()}
        onMouseEnter={() => setHover && setHover(true)}
        onMouseLeave={() => setHover && setHover(false)}
        isInMatch={isInMatch}
      >
        <TertiaryButton text={buttonText} icon={buttonIcon} padding={buttonSize.md} />
      </ButtonContainer>
      <ChildrenContainer isHidden={!isActive}>{children}</ChildrenContainer>
    </DropdownWrapper>
  );
};
