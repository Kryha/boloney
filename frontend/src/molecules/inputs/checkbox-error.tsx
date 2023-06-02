import { FC } from "react";
import { ErrorIconSVG } from "../../assets";
import { BaseIcon, BodyText, PositionContent } from "../../atoms";
import { spacing } from "../../design";
import { CheckboxErrorContainer } from "./styles";

interface CheckboxInputProps {
  errorMessage?: string;
  margin?: string;
  gap?: string;
  position?: PositionContent;
}

/**
 * @description A component that renders an error message for a checkbox.
 * @param {string} errorMessage - The error message to display
 * @param {string} margin - The margin of the error checkbox
 * @param {string} gap - The gap between the icon and the error checkbox
 * @param {PositionContent} position - The position of the error checkbox
 */

export const CheckboxError: FC<CheckboxInputProps> = ({ margin, gap, errorMessage, position }) => {
  return (
    <CheckboxErrorContainer alignItems="center" gap={gap || spacing.xxs} margin={margin} position={position}>
      <BaseIcon src={<ErrorIconSVG />} alignSelf="flex-start" />
      <BodyText>{errorMessage}</BodyText>
    </CheckboxErrorContainer>
  );
};
