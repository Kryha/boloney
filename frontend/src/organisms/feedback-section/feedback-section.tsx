import { FC } from "react";

import { text } from "../../assets";
import { BaseRow, BodyText, Heading2, Heading6, LinkText } from "../../atoms";
import { color, spacing } from "../../design";
import { PrimaryButton } from "../../molecules";
import { routes } from "../../navigation";
import { FeedbackWrapper, TitleSection } from "./styles";

interface FeedbackSectionProps {
  onFeedbackFormClick: () => void;
}

/**
 * @description Organism for the feedback section for end of match.
 * @param {onFeedbackFormClick} - Function to handle feedback form click.
 */

export const FeedbackSection: FC<FeedbackSectionProps> = ({ onFeedbackFormClick }) => {
  return (
    <FeedbackWrapper>
      <TitleSection>
        <Heading6>{text.endOfMatch.endOfMatch}</Heading6>
      </TitleSection>

      <Heading2>{text.feedback.didYouLoveit}</Heading2>
      <Heading2 customcolor={color.darkGrey}>{text.feedback.helpUsImproveBoloney}</Heading2>
      <BaseRow justifyContent="flex-end" alignItems="center" gap={spacing.s}>
        <BodyText transformText="none"> {text.feedback.goTo}</BodyText>
        <LinkText href={routes.home} transformText="none">
          {text.feedback.homepage}
        </LinkText>
        <PrimaryButton primaryText={text.feedback.helpUsImprove} onClick={() => onFeedbackFormClick()} />
      </BaseRow>
    </FeedbackWrapper>
  );
};
