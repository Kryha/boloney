import { FC } from "react";

import { BLANK_TARGET_LINK, BUG_FORM_LINK, FEEDBACK_FORM_LINK } from "../../constants";
import { useIsMobile } from "../../hooks";
import { Contact, EqualLayout } from "../../molecules";
import { GeneralNavigationBar, TextLogo } from "../../organisms";

export const ContactPage: FC = () => {
  const isMobile = useIsMobile();
  const rightSection = isMobile ? <></> : <GeneralNavigationBar />;

  const handleBugFormClick = () => {
    window.open(BUG_FORM_LINK, BLANK_TARGET_LINK);
  };

  const handleFeedbackFormClick = () => {
    window.open(FEEDBACK_FORM_LINK, BLANK_TARGET_LINK);
  };

  return (
    <EqualLayout
      leftSection={<TextLogo />}
      mainSection={<Contact handleBugFormClick={handleBugFormClick} handleFeedbackFormClick={handleFeedbackFormClick} />}
      rightSection={rightSection}
    />
  );
};
