import { FC, ReactNode } from "react";
import { ButtonInfoWrap, Info } from "./styles";
import { InfoPosition, TooltipInfo } from "./tooltip-info";

interface TooltipProps {
  title?: string;
  info?: ReactNode;
  infoPosition?: InfoPosition;
  isButtonWithHelper?: boolean;
}

export const Tooltip: FC<TooltipProps> = ({ title, info, infoPosition, isButtonWithHelper }) => {
  if (!title || !info) return <></>;

  return (
    <ButtonInfoWrap>
      <TooltipInfo title={title} content={info} position={infoPosition} isButtonWithHelper={isButtonWithHelper}>
        <Info />
      </TooltipInfo>
    </ButtonInfoWrap>
  );
};
