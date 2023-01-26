import React, { FC, useState } from "react";
import { text } from "../../assets";
import { TooltipContent, TooltipDescription, TooltipHeading, ToolTipText, TooltipWrap } from "./styles";

export type InfoPosition = "top" | "bottom" | "left" | "right";

interface TooltipInfoProps {
  title?: string;
  position?: InfoPosition;
  content: string;
  children: React.ReactNode;
  isButtonWithHelper?: boolean;
}

export const TooltipInfo: FC<TooltipInfoProps> = ({ title, position = "top", content, children, isButtonWithHelper = false }) => {
  const [active, setActive] = useState(false);

  const showTip = () => setActive(true);

  const hideTip = () => setActive(false);

  //TODO: add link to tooltip
  return (
    <TooltipWrap onMouseEnter={showTip} onMouseLeave={hideTip} onBlur={hideTip}>
      {children}
      {active && (
        <TooltipContent className={position} isButtonWithHelper={isButtonWithHelper}>
          <ToolTipText>
            <TooltipHeading>{text.param.appendColon(title)}</TooltipHeading>
            <TooltipDescription>{content}</TooltipDescription>
          </ToolTipText>
        </TooltipContent>
      )}
    </TooltipWrap>
  );
};
