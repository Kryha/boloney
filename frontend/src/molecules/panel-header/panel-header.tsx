import { FC } from "react";
import { CloseIconSVG, PlusIconSVG } from "../../assets";
import { BaseIcon, Heading4 } from "../../atoms";
import { PanelHeaderContainer, PanelHeaderWrapper } from "./styles";

interface Props {
  isHeaderSelected: boolean;
  heading: string;
  isIconShown?: boolean;
  isMultipleHeaders?: boolean;

  onClick: () => void;
}

/**
 *
 * This is the panel header component, it is displayed in the panel.
 * @param {boolean} isHeaderSelected - A boolean to define if the header has been selected.
 * @param {string} heading - The heading of the panel.
 * @param {boolean} isIconShown - A boolean to define if the icon is shown in the header.
 * @param {boolean} isMultipleHeaders - A boolean to define if there are multiple headers within the player menu.
 * @param {Function} onClick - A function whose use is to define if the header/icon is selected or not.
 */

export const PanelHeader: FC<Props> = ({ isHeaderSelected, heading, isIconShown, isMultipleHeaders, onClick }) => {
  const icon = isHeaderSelected ? <CloseIconSVG /> : <PlusIconSVG />;
  return (
    <PanelHeaderWrapper
      onClick={onClick}
      isHeaderSelected={isHeaderSelected}
      enabled={isIconShown}
      hover={isIconShown}
      isMultipleHeaders={isMultipleHeaders}
    >
      <PanelHeaderContainer alignItems="center" justifyContent="space-between">
        <Heading4>{heading}</Heading4>
        {isIconShown && <BaseIcon src={icon} onClick={onClick} pointer />}
      </PanelHeaderContainer>
    </PanelHeaderWrapper>
  );
};
