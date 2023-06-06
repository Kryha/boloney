import { FC } from "react";

import { ExitIconSVG, RaisedHandIconSVG, SettingsScrewSVG, text } from "../../assets";
import { BaseIcon, IconImage } from "../../atoms";
import { color } from "../../design";
import { Dropdown } from "../dropdown";
import { MenuButton } from "./menu-button";
import { MenuWrapper } from "./styles";

interface Props {
  isOpen: boolean;

  onSettingsClick: () => void;
  onLeaveMatchClick: () => void;
  expand: () => void;
  onClickOutsideDropdown: (ref: React.RefObject<HTMLElement>, isOpen: boolean) => void;
}

/**
 *
 * This is the match menu component, its is displayed in the match as part of the match menu navigation.
 * @param {boolean} isOpen - If the Menu is open.
 * @param {Function} onSettingsClick - A function to handle viewing the match settings.
 * @param {Function} onLeaveMatchClick - A function to handle leaving the match.
 * @param {Function} expand - A function whose use is to define what happens when you click on the menu.
 * @param {Function} onClickOutsideDropdown - A function to handle closing the dropdown when clicking outside of it.
 */

export const MatchMenu: FC<Props> = ({ isOpen, onSettingsClick, onLeaveMatchClick, expand, onClickOutsideDropdown }) => {
  return (
    <Dropdown
      useOnClickOutside={onClickOutsideDropdown}
      isOpen={isOpen}
      buttonText={text.general.matchOptions}
      buttonIcon={<BaseIcon src={<SettingsScrewSVG />} iconColor={color.transparent} strokeColor={color.black} pointer padding="1px" />}
      expand={expand}
    >
      <MenuWrapper>
        <MenuButton
          buttonText={text.general.matchSettings}
          buttonIcon={<IconImage src={RaisedHandIconSVG} pointer />}
          hasDivider
          expand={() => onSettingsClick()}
        />
        <MenuButton
          buttonText={text.general.leaveMatch}
          buttonIcon={<BaseIcon src={<ExitIconSVG />} pointer />}
          expand={() => onLeaveMatchClick()}
        />
      </MenuWrapper>
    </Dropdown>
  );
};
