import { FC } from "react";
import { ButtonInfoWrap, Info } from "./styles";
import { InfoPosition, TooltipInfo } from "./tooltip-info";

interface TooltipProps {
  title?: string;
  info?: string;
  infoPosition?: InfoPosition;
}

export const Tooltip: FC<TooltipProps> = ({ title, info, infoPosition }) => {
  if (!title || !info) return <></>;

  return (
    <ButtonInfoWrap>
      <TooltipInfo title={title} content={info} position={infoPosition}>
        <Info />
      </TooltipInfo>
    </ButtonInfoWrap>
  );
};
