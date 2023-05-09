import { FC, ReactNode } from "react";
import { buttonSize } from "../../design";
import { TertiaryButton } from "../buttons";
import { MenuButtonContainer } from "./styles";

interface Props {
  buttonText: string;
  buttonIcon: ReactNode;
  hasDivider?: boolean;

  expand: () => void;
}

/**
 *
 * This is the menu button component, it is displayed in the menu.
 * @param {ReactNode} buttonIcon - The icon of the button.
 * @param {string} buttonText - The text for the button.
 * @param {boolean} hasDivider - A boolean to define if a menu item has a divider. i.e if it is the first item displayed in the menu then it has no divider.
 * @param {Function} expand - A function whose use is to define what happens when you click on a button.
 */

export const MenuButton: FC<Props> = ({ buttonIcon, buttonText, hasDivider, expand }) => {
  return (
    <MenuButtonContainer hasDivider={hasDivider}>
      <TertiaryButton
        text={buttonText}
        icon={buttonIcon}
        padding={buttonSize.md}
        onClick={() => expand()}
        width={buttonSize.fluid}
        justifyContent="flex-end"
        isActive
      />
    </MenuButtonContainer>
  );
};
