import { FC, ReactNode } from "react";

import { MenuChildrenContainer, MenuToggleHeadingSection, MenuToggleSection } from "./styles";
import { useIsInMatch, useLayoutStore } from "../../service";
import { CloseIconSVG } from "../../assets";
import { BaseIcon, Heading4 } from "../atoms";

interface MenuToggleProps {
  closeMenuItem: () => void;
  isToggled: boolean;
  title: string;
  children: ReactNode;
  isChat?: boolean;
  isInLobby?: boolean;
}

export const MenuToggle: FC<MenuToggleProps> = ({ closeMenuItem, isToggled, title, children, isChat = false, isInLobby = false }) => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const isInMatch = useIsInMatch();

  return (
    <MenuToggleSection
      isMenuOpen={isChatToggled && isHistoryToggled}
      isToggled={isToggled}
      isInMatch={isInMatch}
      isChat={isChat}
      isInLobby={isInLobby}
    >
      <MenuToggleHeadingSection onClick={() => closeMenuItem()}>
        <Heading4>{title}</Heading4>
        <BaseIcon src={<CloseIconSVG />} />
      </MenuToggleHeadingSection>
      <MenuChildrenContainer>{children}</MenuChildrenContainer>
    </MenuToggleSection>
  );
};
