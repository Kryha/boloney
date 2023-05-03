import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { GeneralContentWrapper, Heading2, Heading6 } from "../../atoms";
import { BaseLayout, FadeTransition, GeneralLink, Logo, MatchLayout, TopNavigation } from "../../components";
import { FEEDBACK_FORM_LINK, BLANK_TARGET_LINK } from "../../constants";
import { PrimaryButton } from "../../molecules";
import { routes } from "../../navigation";
import { LinkWrapper, TitleSection } from "./styles";

export const Feedback = () => {
  return <BaseLayout leftSection={<Logo />} mainSection={<FeedbackComponent />} rightSection={<TopNavigation />} />;
};

const FeedbackComponent: FC = () => {
  const navigate = useNavigate();

  const handleFeedbackFormClick = () => {
    window.open(FEEDBACK_FORM_LINK, BLANK_TARGET_LINK);
    navigate(routes.home);
  };

  return (
    <FadeTransition>
      <MatchLayout>
        <GeneralContentWrapper>
          <TitleSection>
            <Heading6>{text.endOfMatch.endOfMatch}</Heading6>
          </TitleSection>

          <Heading2>{text.feedback.didYouLoveit}</Heading2>
          <Heading2>{text.feedback.helpUsImproveBoloney}</Heading2>
          <LinkWrapper>
            <GeneralLink linkText={text.feedback.goToHomePage} link={routes.home} isWebsite isSelfTarget />
            <PrimaryButton primaryText={text.feedback.helpUsImprove} onClick={() => handleFeedbackFormClick()} />
          </LinkWrapper>
        </GeneralContentWrapper>
      </MatchLayout>
    </FadeTransition>
  );
};
