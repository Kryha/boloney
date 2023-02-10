import { FC } from "react";
import { text } from "../../assets";
import { useObserver } from "../../hooks";
import { GeneralLink } from "../links";
import { LinkContainer } from "./styles";

export const BottomLinkSection: FC = () => {
  const { ref, isVisible } = useObserver();

  return (
    <LinkContainer ref={ref} isVisible={isVisible}>
      <GeneralLink
        heading={text.landing.spottedABug}
        generalText={text.landing.reachOutTo}
        link={text.landing.boloneyHelpEmail}
        linkText={text.landing.boloneyHelpEmail}
      />
      <GeneralLink
        heading={text.landing.joinTheCommunity}
        generalText={text.landing.headTo}
        link={text.landing.discordLink}
        linkText={text.landing.discord}
      />
    </LinkContainer>
  );
};
