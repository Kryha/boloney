import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { MatchSettings } from "../../types";
import { Legend, LegendContainer, LegendTitle } from "../inputs/styles";
import { InfoPosition, Tooltip } from "../tooltip";
import {
  Description,
  ToggleContent,
  ToggleSwitchButton,
  ToggleSwitchContainer,
  ToggleSwitchFieldSet,
  ToggleSwitchInner,
  ToggleSwitchInput,
  ToggleSwitchLabel,
  ToggleSwitchWrapper,
  ToggleTitle,
} from "./styles";

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
        <LegendContainer>
          <LegendTitle>{title}</LegendTitle>
          <Tooltip title={tooltipTitle} info={tooltipDescription} infoPosition={infoPosition} />
        </LegendContainer>
      </Legend>

      <ToggleSwitchContainer>
        <ToggleSwitchWrapper>
          <ToggleSwitchInput
            id="zk-toggle"
            type="checkbox"
            checked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            disabled={disabled}
            {...register("zkEnabled")}
          />
          <ToggleSwitchLabel htmlFor="zk-toggle" tabIndex={disabled ? -1 : 1}>
            <ToggleSwitchInner />
            <ToggleSwitchButton />
          </ToggleSwitchLabel>
        </ToggleSwitchWrapper>
        <ToggleContent>
          <ToggleTitle>{descriptionTitle}</ToggleTitle>
          <Description>{description}</Description>
        </ToggleContent>
      </ToggleSwitchContainer>
    </ToggleSwitchFieldSet>
  );
};
