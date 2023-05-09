import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { GeneralContentWrapper, Heading2, Heading6 } from "../../atoms";
import { BaseLayout, FadeTransition, Logo, PartialLink } from "../../components";
import { FEEDBACK_FORM_LINK, BLANK_TARGET_LINK } from "../../constants";
import { color } from "../../design";
import { PrimaryButton } from "../../molecules";
import { routes } from "../../navigation";
import { LinkWrapper, TitleSection } from "./styles";

export const Feedback = () => {
  return <BaseLayout leftSection={<Logo />} mainSection={<FeedbackComponent />} />;
};

const FeedbackComponent: FC = () => {
  const navigate = useNavigate();

  const handleFeedbackFormClick = () => {
    window.open(FEEDBACK_FORM_LINK, BLANK_TARGET_LINK);
    navigate(routes.home);
  };

  return (
    <FadeTransition>
      <GeneralContentWrapper>
        <TitleSection>
          <Heading6>{text.endOfMatch.endOfMatch}</Heading6>
        </TitleSection>

        <Heading2>{text.feedback.didYouLoveit}</Heading2>
        <Heading2 customcolor={color.darkGrey}>{text.feedback.helpUsImproveBoloney}</Heading2>
        <LinkWrapper>
          <PartialLink
            preLinkText={text.feedback.goTo}
            linkText={text.feedback.homepage}
            link={routes.home}
            transformText="none"
            isWebsite
            isSelfTarget
          />
          <PrimaryButton primaryText={text.feedback.helpUsImprove} onClick={() => handleFeedbackFormClick()} />
        </LinkWrapper>
      </GeneralContentWrapper>
    </FadeTransition>
  );
};
