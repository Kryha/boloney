import { FC, ReactNode } from "react";
import { Heading4 } from "../atoms/text";

import { Close, MenuChildrenContainer, MenuToggleHeadingSection, MenuToggleSection } from "./styles";
import { useLayoutStore } from "../../service/layout-config";
import { useIsInMatch } from "../../service";

interface MenuToggleProps {
  closeMenuItem: () => void;
  isToggled: boolean;
  title: string;
  isChat?: boolean;
  children: ReactNode;
}

export const MenuToggle: FC<MenuToggleProps> = ({ closeMenuItem, isToggled, title, children, isChat = false }) => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const isInMatch = useIsInMatch();

  return (
    <MenuToggleSection
      isMenuOpen={isChatToggled && isHistoryToggled}
      onClick={() => closeMenuItem()}
      isToggled={isToggled}
      isInMatch={isInMatch}
      isChat={isChat}
    >
      <MenuToggleHeadingSection>
        <Heading4>{title}</Heading4>
        <Close />
      </MenuToggleHeadingSection>
      <MenuChildrenContainer>{children}</MenuChildrenContainer>
    </MenuToggleSection>
  );
};
