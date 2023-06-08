import { FC } from "react";

import { color, spacing } from "../../design";
import { BaseColumn, BaseRow, BodyText, GeneralRow, Heading6, Legend, Slider, SwitchInput, SwitchWrapper, FieldSet } from "../../atoms";
import { Tooltip, TooltipInfoPosition } from "../tooltip";
import { ToggleSwitchFieldSetWrapper } from "./styles";

interface Props {
  title?: string;
  description?: string;
  descriptionTitle?: string;
  tooltipDescription?: string;
  disabled?: boolean;
  infoPosition?: TooltipInfoPosition;
  tooltipTitle?: string;
  isChecked: boolean;
  toggleSwitch: () => void;
}

export const ZKToggleSwitch: FC<Props> = ({
  disabled = false,
  title,
  description,
  descriptionTitle,
  tooltipTitle,
  tooltipDescription,
  infoPosition,
  isChecked,
  toggleSwitch,
}) => {
  return (
    <ToggleSwitchFieldSetWrapper>
      <FieldSet childNode={1}>
        <Legend>
          <GeneralRow alignItems="center" gap={spacing.xs}>
            <Heading6>{title}</Heading6>
            <Tooltip title={tooltipTitle} description={tooltipDescription} infoPosition={infoPosition} />
          </GeneralRow>
        </Legend>

        <BaseRow alignItems="center" gap={spacing.s}>
          <SwitchWrapper onClick={() => toggleSwitch()}>
            <SwitchInput id="zk-toggle" type="checkbox" checked={isChecked} />
            <Slider className="slider" disabled={disabled} />
          </SwitchWrapper>
          <BaseColumn>
            <BodyText>{descriptionTitle}</BodyText>
            <BodyText customcolor={color.darkGrey}>{description}</BodyText>
          </BaseColumn>
        </BaseRow>
      </FieldSet>
    </ToggleSwitchFieldSetWrapper>
  );
};
