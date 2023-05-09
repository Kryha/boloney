import { FC } from "react";
import { LinkProps, LinkText } from "../../atoms";
import { TextWithComponent } from "./text-with-component";

interface Props extends LinkProps {
  text?: string;
  gap?: string;
  href?: string;
  linkText?: string;
  target?: string;
}

/**
 * N.B You must have the same text (font, fontSize, fontWeight) as the link component.
 * @param {string} text - general text with the link (you can change the text font, size, weight)
 * @param {string} href - link / email address (you must include "mailito: a.gmail.com" as the string for mails)
 * @param {string} gap - gap between text and link component
 * @param {string} linkText - the text for the link
 * @param {string} target - the target for the link i.e _blank for opening in a new page. The default state is opening on the same page.
 */

export const TextWithLink: FC<Props> = ({
  text,
  href,
  customcolor,
  fontSize,
  fontWeight,
  lineHeight,
  transformText,
  gap,
  font,
  target,
  linkText,
}) => {
  return (
    <TextWithComponent
      customcolor={customcolor}
      transformText={transformText}
      text={text}
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      font={font}
      linkComponent={
        <LinkText
          href={href}
          target={target}
          fontSize={fontSize}
          lineHeight={lineHeight}
          fontWeight={fontWeight}
          font={font}
          customcolor={customcolor}
          transformText={transformText}
        >
          {linkText}
        </LinkText>
      }
      gap={gap}
    />
  );
};
