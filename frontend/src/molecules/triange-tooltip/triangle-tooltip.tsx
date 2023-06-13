import { FC, ReactNode } from "react";
import { ArrowTooltip, TriangleToolTipWrapper } from "./styles";

export type InfoPosition = "top" | "bottom" | "left" | "right";

interface Props {
  children: ReactNode;
  tooltipIndicator: ReactNode;
  position?: InfoPosition;
  tooltipMargin?: string;
  active: boolean;
  setActive: (active: boolean) => void;
}

/**
 * This molecule is used to display a tooltip with a title and description.
 * @param {ReactNode} children -  The Information displayed in the tooltip
 * @param {ReactNode} tooltipIndicator - The object that on hover is used to display the tooltip
 * @param {string} tooltipMargin - The amount of margin to the right of the tooltipIndicator
 * @param {InfoPosition} position - The position of the tooltip
 * @param {ReactNode} active - A boolean used to display if the tool tip is active
 * @param {Function} setActive - A function used to indicate if a tooltip is active or not.
 */

export const TriangleToolTip: FC<Props> = ({ children, position = "bottom", tooltipIndicator, tooltipMargin, active, setActive }) => {
  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };
  return (
    <TriangleToolTipWrapper className="Tooltip-Wrapper" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {tooltipIndicator}
      {active && (
        <ArrowTooltip className={position || "top"} tooltipMargin={tooltipMargin}>
          {children}
        </ArrowTooltip>
      )}
    </TriangleToolTipWrapper>
  );
};
