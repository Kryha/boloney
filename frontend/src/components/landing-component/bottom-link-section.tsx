import { FC } from "react";
import { text } from "../../assets";
import { color, FontProps, fonts, fontSizes, fontWeights } from "../../design";
import { useObserver } from "../../hooks";
import { GeneralLink, SocialMediaImageLinks } from "../links";
import { LinkContainer } from "./styles";

interface Props {
  linkFontWeight?: string;
  linkFontSize?: FontProps;
  linkLineHeight?: FontProps;
}

export const BottomLinkSection: FC<Props> = ({ linkFontSize, linkFontWeight, linkLineHeight }) => {
  const { ref, isVisible } = useObserver();
  const fontSize = linkFontSize ?? fontSizes.heading3;
  const fontWeight = linkFontWeight ?? fontWeights.regular;
  const lineHeight = linkLineHeight ?? fontSizes.heading3;

  return (
    <LinkContainer ref={ref} isVisible={isVisible}>
      <GeneralLink
        heading={text.landing.spottedABug}
        generalText={text.landing.reachOutTo}
        link={text.landing.boloneyHelpEmail}
        linkText={text.landing.boloneyHelpEmail}
        fontWeight={fontWeight}
        fontSize={fontSize}
        lineHeight={lineHeight}
        font={fonts.secondary}
        customcolor={color.darkGrey}
      />
      <SocialMediaImageLinks />
    </LinkContainer>
  );
};
