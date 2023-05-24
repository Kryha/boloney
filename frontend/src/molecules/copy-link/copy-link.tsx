import { FC } from "react";
import { CopyIconSVG, text } from "../../assets";
import { BaseIcon, GeneralText, LinkText } from "../../atoms";
import { fontSizes, lineHeights, spacing } from "../../design";
import { CopyLinkWrapper, LinkCopiedBlock } from "./styles";

interface Props {
  link: string;
  linkText: string;
  isLinkCopied: boolean;
  onClick: () => void;
}

/*
 * This is a component that is used for copying a link, with an animated div motioning upwards.
 * @param {string} link - The link url.
 * @param {string} linkText - The text displayed for the link.
 * @param {boolean} isLinkCopied - The boolean is used to begin the animation.
 * @param {Function} onClick - The function is used to signify once the button is clicked to start the animation
 */

export const CopyLink: FC<Props> = ({ link, linkText, isLinkCopied, onClick }) => {
  return (
    <CopyLinkWrapper onClick={onClick} isCopied={isLinkCopied} gap={spacing.s} alignItems="flex-end">
      <LinkText href={link} transformText="none" fontSize={fontSizes.generalText} lineHeight={lineHeights.generalText}>
        {linkText}
      </LinkText>
      <BaseIcon src={<CopyIconSVG />} pointer />
      <LinkCopiedBlock>
        <GeneralText>{text.general.copied}</GeneralText>
      </LinkCopiedBlock>
    </CopyLinkWrapper>
  );
};
