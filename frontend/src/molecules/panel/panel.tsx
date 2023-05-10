import { FC, ReactNode } from "react";
import { PlayerMenuBlock } from "../../atoms";
import { PanelHeader } from "../panel-header";
import { PanelWrapper } from "./styles";

interface Props {
  isHeaderSelected: boolean;
  isPanelExpanded: boolean;
  heading: string;
  isMultiplePanels?: boolean;
  children?: ReactNode;

  setIsHeaderSelected?: () => void;
}

/**
 *
 * This is the panel component, it is displayed in the player menu.
 * @param {boolean} isHeaderSelected - A boolean to define if the header has been selected.
 * @param {boolean}  isPanelExpanded - A boolean to define if the panel has been expanded.
 * @param {string} heading - The heading of the panel.
 * @param {boolean} isMultiplePanels - A boolean to define if there are multiple panels within the player menu.
 * @param {ReactNode} children - The content of the panel.
 * @param {Function} setIsHeaderSelected - A function whose use is to define if the panel header is selected or not.
 */

export const Panel: FC<Props> = ({ isHeaderSelected, setIsHeaderSelected, isPanelExpanded, heading, isMultiplePanels, children }) => {
  return (
    <PanelWrapper isMultiplePanels={isMultiplePanels}>
      <PanelHeader
        heading={heading}
        isHeaderSelected={isHeaderSelected}
        onClick={() => setIsHeaderSelected && setIsHeaderSelected()}
        isIconShown={isMultiplePanels}
        isMultipleHeaders={isMultiplePanels}
      />
      {isHeaderSelected && (
        <PlayerMenuBlock isSingularPanel={!isMultiplePanels} open={isPanelExpanded}>
          {children}
        </PlayerMenuBlock>
      )}
    </PanelWrapper>
  );
};
