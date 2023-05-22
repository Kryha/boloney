import { FC } from "react";
import { GithubLogo, text } from "../../assets";
import { BaseColumn, BaseRow, FluidImage, HyperLink, LinkText } from "../../atoms";
import { BLANK_TARGET_LINK } from "../../constants";
import { fontSizes, images, lineHeights, spacing } from "../../design";
import { routes } from "../../navigation";
import { RulesHeading } from "../text";
import { FooterWrapper } from "./styles";

export const Footer: FC = () => {
  return (
    <FooterWrapper mobileGap={spacing.xxl} alignItems="flex-start" gap={spacing.lg}>
      <RulesHeading
        gap={spacing.s}
        heading={text.landing.joinTheCommunity}
        paragraph={
          <BaseRow gap={spacing.md}>
            <HyperLink href={text.landing.githubLink} target={BLANK_TARGET_LINK}>
              <FluidImage src={GithubLogo} width={images.auto} height={images.social} />
            </HyperLink>
            {/* TODO: add enable link */}
            {/* <HyperLink href={text.landing.discordLink} target={BLANK_TARGET_LINK}>
              <FluidImage src={DiscordLogo} width={images.auto} height={images.social} />
            </HyperLink> */}
          </BaseRow>
        }
      />
      <RulesHeading
        gap={spacing.s}
        heading={text.contact.importantThings}
        paragraph={
          <BaseColumn>
            <LinkText href={routes.privacy} fontSize={fontSizes.body} lineHeight={lineHeights.body}>
              {text.contact.privacyPolicy}
            </LinkText>
            <LinkText href={routes.termsOfUse} fontSize={fontSizes.body} lineHeight={lineHeights.body}>
              {text.contact.termsAndConditions}
            </LinkText>
          </BaseColumn>
        }
      />
      <RulesHeading
        gap={spacing.s}
        heading={text.contact.comeSayHi}
        paragraph={
          <BaseColumn>
            <LinkText href={routes.contact} fontSize={fontSizes.body} lineHeight={lineHeights.body}>
              {text.contact.contactUs}
            </LinkText>
          </BaseColumn>
        }
      />
    </FooterWrapper>
  );
};
