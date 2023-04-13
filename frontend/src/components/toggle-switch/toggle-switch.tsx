import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { color } from "../../design";
import { BodyText, GeneralRow, Heading6, Legend, Slider, SwitchInput, SwitchWrapper } from "../atoms";
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
  register: UseFormRegister<MatchSettings>;
}

export const ToggleSwitch: FC<Props> = ({
  disabled = false,
  register,
  title,
  description,
  descriptionTitle,
  tooltipTitle,
  tooltipDescription,
  infoPosition,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ToggleSwitchFieldSet isRow={false} childNode={1}>
      <Legend>
        <GeneralRow alignItems="center">
          <Heading6>{title}</Heading6>
          <Tooltip title={tooltipTitle} info={tooltipDescription} infoPosition={infoPosition} />
        </GeneralRow>
      </Legend>

      <ToggleSwitchContainer>
        <SwitchWrapper onClick={() => setIsChecked(!isChecked)}>
          <SwitchInput id="zk-toggle" type="checkbox" checked={isChecked} {...register("zkEnabled")} />
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
