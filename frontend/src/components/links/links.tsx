import { FC } from "react";
import { OPEN_LINK_IN_NEW_TAB } from "../../constants";
import { color } from "../../design";
import { Heading3, Heading6, LinkProps } from "../atoms";
import { Link } from "../buttons";
import { GeneralLinkContainer, GeneralLinkWrapper, HyperLink } from "./styles";

interface Props extends LinkProps {
  isWebsite?: boolean;
  generalText?: string;
  linkText: string;
  link: string;
  heading?: string;
}

export const EmailLink: FC<Props> = ({ linkText, customColor, fontWeight, fontSize, lineHeight, font, transformText }) => {
  // TODO: make a function for this string
  return (
    <HyperLink href={`mailto:${linkText}`}>
      <Link
        primaryText={linkText}
        customColor={customColor}
        fontWeight={fontWeight}
        fontSize={fontSize}
        lineHeight={lineHeight}
        font={font}
        transformText={transformText}
      />
    </HyperLink>
  );
};

export const WebsiteLink: FC<Props> = ({ linkText, link, customColor, fontWeight, fontSize, lineHeight, font, transformText }) => {
  return (
    <HyperLink href={link} target={OPEN_LINK_IN_NEW_TAB}>
      <Link
        primaryText={linkText}
        customColor={customColor}
        fontWeight={fontWeight}
        fontSize={fontSize}
        lineHeight={lineHeight}
        font={font}
        transformText={transformText}
      />
    </HyperLink>
  );
};

export const GeneralLink: FC<Props> = ({
  isWebsite = false,
  link,
  generalText = "",
  linkText = "",
  heading = "",
  customColor,
  fontWeight,
  fontSize,
  lineHeight,
  font,
  transformText,
}) => {
  const component = isWebsite ? (
    <WebsiteLink
      link={link}
      linkText={linkText}
      customColor={customColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      lineHeight={lineHeight}
      font={font}
      transformText={transformText}
    />
  ) : (
    <EmailLink
      link={link}
      linkText={linkText}
      customColor={customColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      lineHeight={lineHeight}
      font={font}
      transformText={transformText}
    />
  );
  return (
    <GeneralLinkWrapper>
      <Heading6>{heading}</Heading6>
      <GeneralLinkContainer>
        <Heading3 customColor={color.darkGrey}>{generalText}</Heading3>
        {component}
      </GeneralLinkContainer>
    </GeneralLinkWrapper>
  );
};
