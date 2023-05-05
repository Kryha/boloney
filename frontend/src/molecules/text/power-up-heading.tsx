import { FC } from "react";
import { text } from "../../assets";
import { GeneralText, Heading2, LinkText } from "../../atoms";
import { fonts, fontSizes, lineHeights } from "../../design";
import { ColumnHeading } from "./column-heading-text";
import { PowerUpColumn, PowerUpHeadingContent } from "./styles";

interface Props {
  powerUpName: string;
  description: string;
  exampleDescription?: string;
  isDetailShown?: boolean;
  setDetailsShown?: () => void;
  headingColor?: string;
  exampleColor?: string;
  descriptionColor?: string;
  gap?: string;
  showDetailsText?: boolean;
}

/**
 * @param {string} powerUpName - The main large heading
 * @param {string} description - The description under the heading
 * @param {string} exampleDescription - The description under the heading
 * @param {boolean} isDetailShown - Indicates if the details are shown
 * @param {function} setDetailsShown - Sets the details shown
 * @param {boolean} showDetailsText - Indicates if the details text should be shown
 * @param {string} powerUpId - The id of the powerUp
 * @param {string} gap - gap between texts
 * @param {string} headingColor - the heading color
 * @param {string} descriptionColor - the description color
 */

export const PowerUpHeading: FC<Props> = ({
  powerUpName,
  description,
  exampleDescription,
  isDetailShown,
  setDetailsShown,
  gap,
  headingColor,
  exampleColor,
  descriptionColor,
  showDetailsText = false,
}) => {
  const detailText = isDetailShown ? text.powerUps.hideDetails : text.powerUps.seeDetails;

  return (
    <PowerUpColumn alignItems="start" gap={gap}>
      <Heading2 customcolor={headingColor}>{powerUpName}</Heading2>
      {showDetailsText ? (
        <>
          <PowerUpHeadingContent isDetailShown={isDetailShown}>
            <ColumnHeading
              subheading={exampleDescription}
              heading={description}
              headingFontSize={fontSizes.generalText}
              subheadingFontSize={fontSizes.generalText}
              headingLineHeight={lineHeights.generalText}
              headingFont={fonts.primary}
              subheadingFont={fonts.primary}
              subheadingLineHeight={lineHeights.generalText}
              subheadingColor={exampleColor}
            />
          </PowerUpHeadingContent>
          <LinkText
            onClick={(e) => {
              e.stopPropagation();
              setDetailsShown && setDetailsShown();
            }}
            customcolor={descriptionColor}
            fontSize={fontSizes.generalText}
            lineHeight={lineHeights.generalText}
          >
            {detailText}
          </LinkText>
        </>
      ) : (
        <GeneralText>{description}</GeneralText>
      )}
    </PowerUpColumn>
  );
};
