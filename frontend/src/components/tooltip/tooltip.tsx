import { FC, ReactNode } from "react";
import { InfoIconSVG } from "../../assets";
import { BaseIcon } from "../../atoms";
import { ButtonInfoWrap } from "./styles";
import { InfoPosition, TooltipInfo } from "./tooltip-info";

interface TooltipProps {
  title?: string;
  info?: ReactNode;
  infoPosition?: InfoPosition;
  isButtonWithHelper?: boolean;
  zIndex?: number;
  iconColor?: string;
}

export const Tooltip: FC<TooltipProps> = ({ title, info, infoPosition, isButtonWithHelper, zIndex, iconColor }) => {
  if (!title && !info) return <></>;

  return (
    <ButtonInfoWrap>
      <TooltipInfo title={title} content={info} position={infoPosition} isButtonWithHelper={isButtonWithHelper} zIndex={zIndex}>
        <BaseIcon src={<InfoIconSVG />} pointer iconColor={iconColor} />
      </TooltipInfo>
    </ButtonInfoWrap>
  );
};
