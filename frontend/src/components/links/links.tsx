import { FC } from "react";
import { color } from "../../design";
import { Heading3, Heading6 } from "../atoms";
import { Link } from "../buttons";
import { GeneralLinkContainer, GeneralLinkWrapper, HyperLink } from "./styles";

interface Props {
  isWebsite?: boolean;
  generalText?: string;
  linkText: string;
  link: string;
  heading?: string;
}

export const EmailLink: FC<Props> = ({ linkText }) => {
  return (
    <HyperLink href={`mailto:${linkText}`}>
      <Link primaryText={linkText} />
    </HyperLink>
  );
};

export const WebsiteLink: FC<Props> = ({ linkText, link }) => {
  return (
    <HyperLink href={link} target="_blank">
      <Link primaryText={linkText} />
    </HyperLink>
  );
};

export const GeneralLink: FC<Props> = ({ isWebsite = true, link, generalText = "", linkText = "", heading = "" }) => {
  const component = isWebsite ? <WebsiteLink link={link} linkText={linkText} /> : <EmailLink link={link} linkText={linkText} />;
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
