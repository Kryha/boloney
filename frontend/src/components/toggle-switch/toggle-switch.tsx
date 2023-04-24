import { FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { color } from "../../design";
import { BodyText, GeneralRow, Heading6, Legend, Slider, SwitchInput, SwitchWrapper } from "../../atoms";
import { MatchSettings } from "../../types";
import { InfoPosition, Tooltip } from "../tooltip";
import { ToggleContent, ToggleSwitchContainer, ToggleSwitchFieldSet } from "./styles";

interface Props {
  title?: string;
  description?: string;
  descriptionTitle?: string;
  tooltipDescription?: string;
  disabled?: boolean;
  infoPosition?: InfoPosition;
  tooltipTitle?: string;
  setValue: UseFormSetValue<MatchSettings>;
}

export const ToggleSwitch: FC<Props> = ({
  disabled = false,
  title,
  description,
  descriptionTitle,
  tooltipTitle,
  tooltipDescription,
  infoPosition,
  setValue,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => {
    setIsChecked(!isChecked);
    setValue("zkEnabled", !isChecked);
  };

  return (
    <ToggleSwitchFieldSet isRow={false} childNode={1}>
      <Legend>
        <GeneralRow alignItems="center">
          <Heading6>{title}</Heading6>
          <Tooltip title={tooltipTitle} info={tooltipDescription} infoPosition={infoPosition} />
        </GeneralRow>
      </Legend>

      <ToggleSwitchContainer>
        <SwitchWrapper onClick={() => toggle()}>
          <SwitchInput id="zk-toggle" type="checkbox" checked={isChecked} />
          <Slider className="slider" disabled={disabled} />
        </SwitchWrapper>
        <ToggleContent>
          <BodyText>{descriptionTitle}</BodyText>
          <BodyText customcolor={color.darkGrey}>{description}</BodyText>
        </ToggleContent>
      </ToggleSwitchContainer>
    </ToggleSwitchFieldSet>
  );
};
