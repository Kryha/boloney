import { FC } from "react";
import { BLANK_TARGET_LINK, SELF_TARGET_LINK } from "../../constants";
import { color } from "../../design";
import { Link } from "../../molecules";
import { Heading3, Heading6, LinkProps } from "../../atoms";
import { GeneralLinkContainer, GeneralLinkWrapper, HyperLink } from "./styles";

interface Props extends LinkProps {
  isWebsite?: boolean;
  generalText?: string;
  linkText: string;
  link: string;
  heading?: string;
  isSelfTarget?: boolean;
}

export const EmailLink: FC<Props> = ({ linkText, customcolor, fontWeight, fontSize, lineHeight, font, transformText }) => {
  // TODO: make a function for this string
  return (
    <HyperLink href={`mailto:${linkText}`}>
      <Link
        text={linkText}
        customcolor={customcolor}
        fontWeight={fontWeight}
        fontSize={fontSize}
        lineHeight={lineHeight}
        font={font}
        transformText={transformText}
      />
    </HyperLink>
  );
};

export const WebsiteLink: FC<Props> = ({
  linkText,
  link,
  customcolor,
  fontWeight,
  fontSize,
  lineHeight,
  font,
  transformText,
  isSelfTarget,
}) => {
  const target = isSelfTarget ? SELF_TARGET_LINK : BLANK_TARGET_LINK;

  return (
    <HyperLink href={link} target={target}>
      <Link
        text={linkText}
        customcolor={customcolor}
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
  customcolor,
  fontWeight,
  fontSize,
  lineHeight,
  font,
  transformText,
  isSelfTarget,
}) => {
  const component = isWebsite ? (
    <WebsiteLink
      link={link}
      linkText={linkText}
      customcolor={customcolor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      lineHeight={lineHeight}
      font={font}
      transformText={transformText}
      isSelfTarget={isSelfTarget}
    />
  ) : (
    <EmailLink
      link={link}
      linkText={linkText}
      customcolor={customcolor}
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
        <Heading3 customcolor={color.darkGrey} fontSize={fontSize} lineHeight={lineHeight}>
          {generalText}
        </Heading3>
        {component}
      </GeneralLinkContainer>
    </GeneralLinkWrapper>
  );
};
