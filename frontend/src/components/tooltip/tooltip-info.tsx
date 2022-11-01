import React, { FC, useState } from "react";
import { GeneralText, Heading3 } from "../atoms";
import { TooltipContent, TooltipWrap } from "./styles";

export type InfoPosition = "top" | "bottom" | "left" | "right";

interface TooltipInfoProps {
  title?: string;
  position?: InfoPosition;
  content: string;
  children: React.ReactNode;
}

// TODO: update look of tooltip
export const TooltipInfo: FC<TooltipInfoProps> = ({ title, position = "top", content, children }) => {
  const [active, setActive] = useState(false);

  const showTip = () => setActive(true);

  const hideTip = () => setActive(false);

  return (
    <TooltipWrap onMouseEnter={showTip} onMouseLeave={hideTip} onBlur={hideTip}>
      {children}
      {active && (
        <TooltipContent className={position}>
          <Heading3>{title}</Heading3>
          <GeneralText>{content}</GeneralText>
        </TooltipContent>
      )}
    </TooltipWrap>
  );
};
