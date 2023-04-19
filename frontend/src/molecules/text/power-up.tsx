import { FC } from "react";
import { BaseColumn, GeneralText, Heading2 } from "../../atoms";

interface Props {
  heading?: string;
  description?: string;

  headingColor?: string;
  descriptionColor?: string;
  gap?: string;
}

/**
 * @param {string} heading - The main large heading
 * @param {string} description - The description under the heading
 * @param {string} gap - gap between texts
 * @param {string} headingColor - the heading color
 * @param {string} descriptionColor - the description color
 */

export const PowerUpText: FC<Props> = ({ heading, description, gap, headingColor, descriptionColor }) => {
  return (
    <BaseColumn alignItems="start" gap={gap}>
      <Heading2 customcolor={headingColor}>{heading}</Heading2>
      <GeneralText customcolor={descriptionColor}>{description}</GeneralText>
    </BaseColumn>
  );
};
