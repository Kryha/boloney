import React, { FC, useState } from "react";
import { text } from "../../assets";
import { capitalize } from "../../util";
import { TooltipContent, ToolTipHeading, ToolTipText, TooltipWrap } from "./styles";

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

  return (
    <TooltipWrap onMouseEnter={showTip} onMouseLeave={hideTip} onBlur={hideTip}>
      {children}
      {active && (
        <TooltipContent className={position} isButtonWithHelper={isButtonWithHelper}>
          <ToolTipText>
            <ToolTipHeading>{text.param.appendColon(title)}</ToolTipHeading>
            {capitalize(content)}
          </ToolTipText>
        </TooltipContent>
      )}
    </TooltipWrap>
  );
};
