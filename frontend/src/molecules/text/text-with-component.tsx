import { FC, ReactNode } from "react";
import { BaseRow, Heading3, LinkProps } from "../../atoms";

interface Props extends LinkProps {
  text?: string;
  linkComponent?: ReactNode;
  gap?: string;
}

/**
 * N.B You must have the same text (font, fontSize, fontWeight) as the link component.
 * @param {string} text - general text with the link (you can change the text font, size, weight)
 * @param {ReactNode} linkComponent - link component (you can change the text font, size, weight) directly in the link component
 * @param {string} gap- gap between text and link component
 */

export const TextWithComponent: FC<Props> = ({
  text,
  linkComponent,
  customcolor,
  fontSize,
  fontWeight,
  lineHeight,
  transformText,
  gap,
  font,
}) => {
  return (
    <BaseRow gap={gap} alignItems="center">
      <Heading3
        customcolor={customcolor}
        fontWeight={fontWeight}
        fontSize={fontSize}
        lineHeight={lineHeight}
        transformText={transformText}
        font={font}
      >
        {text}
      </Heading3>
      {linkComponent}
    </BaseRow>
  );
};
