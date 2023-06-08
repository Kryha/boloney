import { FC, ReactNode } from "react";
import { InfoIconSVG } from "../../assets";
import { BaseIcon } from "../../atoms";
import { TooltipInfoPosition, TooltipInfo } from "./tooltip-info";

interface TooltipProps {
  title?: string;
  description?: string;
  info?: ReactNode;
  infoPosition?: TooltipInfoPosition;
  zIndex?: number;
  iconColor?: string;
}

/**
 * @description - This molecule is used to display a tooltip with a title and description.
 * @param {string} title - The title of the tooltip
 * @param {string} description - The description of the tooltip
 * @param {string} info - The info of the tooltip
 * @param {string} infoPosition - The position of the tooltip
 * @param {ReactNode} content - The content of the tooltip
 * @param {ReactNode} children - The children of the tooltip
 * @param {number} zIndex - The z-index of the tooltip
 */

export const Tooltip: FC<TooltipProps> = ({ title, info, zIndex, iconColor, description, infoPosition }) => {
  const isTooltipPresent = title || info || description;
  return (
    <>
      {isTooltipPresent && (
        <TooltipInfo title={title} description={description} content={info} zIndex={zIndex} position={infoPosition}>
          <BaseIcon src={<InfoIconSVG />} pointer iconColor={iconColor} />
        </TooltipInfo>
      )}
    </>
  );
};
