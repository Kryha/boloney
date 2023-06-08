import React, { FC, ReactNode, useState } from "react";
import { text } from "../../assets";
import { zIndex as designZIndex } from "../../design";
import { TooltipFrame } from "../pop-ups";
import { TooltipContentWrapper, TooltipContainer, TooltipWrapper } from "./styles";

export type TooltipInfoPosition = "top" | "bottom" | "left" | "right";
interface TooltipInfoProps {
  title?: string;
  description?: string;
  position?: TooltipInfoPosition;
  content: ReactNode;
  children: React.ReactNode;
  zIndex?: number;
}

/**
 * @description - This molecule is used to display a tooltip with a title and description.
 * @param {string} title - The title of the tooltip
 * @param {string} description - The description of the tooltip
 * @param {string} position - The position of the tooltip
 * @param {ReactNode} content - The content of the tooltip
 * @param {ReactNode} children - The children of the tooltip
 * @param {number} zIndex - The z-index of the tooltip
 * @returns {ReactNode} - Returns the tooltip
 */

export const TooltipInfo: FC<TooltipInfoProps> = ({
  title,
  description,
  children,
  position,
  zIndex = designZIndex.background,
  content,
}) => {
  // TODO: Refactor this by using the ref of the parent in order to display only the correct tooltip
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const showTooltip = () => setIsTooltipActive(true);
  const hideTooltip = () => setIsTooltipActive(false);

  return (
    <TooltipContainer onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onBlur={hideTooltip}>
      {children}
      {isTooltipActive && (
        <TooltipWrapper zIndex={zIndex}>
          <TooltipContentWrapper className={position}>
            <TooltipFrame heading={text.param.appendColon(title)} description={description} content={content} />
          </TooltipContentWrapper>
        </TooltipWrapper>
      )}
    </TooltipContainer>
  );
};
