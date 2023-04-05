import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { color } from "../../design";
import { BodyText, Heading6 } from "../atoms";
import { MatchSettings } from "../../types";
import { Legend, LegendContainer } from "../inputs/styles";
import { InfoPosition, Tooltip } from "../tooltip";
import {
  ToggleContent,
  ToggleSwitchButton,
  ToggleSwitchContainer,
  ToggleSwitchFieldSet,
  ToggleSwitchInner,
  ToggleSwitchInput,
  ToggleSwitchLabel,
  ToggleSwitchWrapper,
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
          <Heading6>{title}</Heading6>
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
          <BodyText>{descriptionTitle}</BodyText>
          <BodyText customcolor={color.darkGrey}>{description}</BodyText>
        </ToggleContent>
      </ToggleSwitchContainer>
    </ToggleSwitchFieldSet>
  );
};
