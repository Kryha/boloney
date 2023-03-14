import { FC, ReactNode } from "react";
import { ButtonInfoWrap, Info } from "./styles";
import { InfoPosition, TooltipInfo } from "./tooltip-info";

interface TooltipProps {
  title?: string;
  info?: ReactNode;
  infoPosition?: InfoPosition;
  isButtonWithHelper?: boolean;
  zIndex?: number;
}

export const Tooltip: FC<TooltipProps> = ({ title, info, infoPosition, isButtonWithHelper, zIndex }) => {
  if (!title && !info) return <></>;

  return (
    <ButtonInfoWrap>
      <TooltipInfo title={title} content={info} position={infoPosition} isButtonWithHelper={isButtonWithHelper} zIndex={zIndex}>
        <Info />
      </TooltipInfo>
    </ButtonInfoWrap>
  );
};
