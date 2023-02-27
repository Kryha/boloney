import React, { FC, ReactNode, useState } from "react";
import { text } from "../../assets";
import { TooltipContent, TooltipContentWrapper, TooltipDescription, TooltipHeading, ToolTipText, TooltipWrap } from "./styles";
import { zIndex as designZIndex } from "../../design";

export type InfoPosition = "top" | "bottom" | "left" | "right";

interface TooltipInfoProps {
  title?: string;
  position?: InfoPosition;
  content: ReactNode;
  children: React.ReactNode;
  isButtonWithHelper?: boolean;
  zIndex?: number;
}

export const TooltipInfo: FC<TooltipInfoProps> = ({
  title,
  position = "top",
  content,
  children,
  isButtonWithHelper = false,
  zIndex = designZIndex.background,
}) => {
  const [active, setActive] = useState(false);

  const showTip = () => setActive(true);

  const hideTip = () => setActive(false);

  //TODO: add link to tooltip
  return (
    <TooltipWrap onMouseEnter={showTip} onMouseLeave={hideTip} onBlur={hideTip}>
      {children}
      {active && (
        <TooltipContentWrapper zIndex={zIndex}>
          <TooltipContent className={position} isButtonWithHelper={isButtonWithHelper}>
            <ToolTipText>
              <TooltipHeading>{text.param.appendColon(title)}</TooltipHeading>
              <TooltipDescription>{content}</TooltipDescription>
            </ToolTipText>
          </TooltipContent>
        </TooltipContentWrapper>
      )}
    </TooltipWrap>
  );
};
