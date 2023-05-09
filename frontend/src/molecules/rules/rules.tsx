import { FC } from "react";
import { InfoIconSVG, text } from "../../assets";
import { BaseIcon } from "../../atoms";
import { Dropdown } from "../dropdown";
import { RulesInformation } from "./rules-information";

interface RulesProps {
  isOpen: boolean;
  expand: () => void;
}

/**
 *
 * This is the rules component, it is displayed in the navigation rules.
 * @param {boolean} isOpen - If the Rules are open.
 * @param {Function} expand - A function whose use is to define what happens when you click on the rules.
 */

export const Rules: FC<RulesProps> = ({ isOpen, expand }) => {
  return (
    <Dropdown
      isOpen={isOpen}
      buttonIcon={<BaseIcon src={<InfoIconSVG />} pointer />}
      buttonText={text.general.rules}
      expand={expand}
      isBorderless
    >
      <RulesInformation />
    </Dropdown>
  );
};
