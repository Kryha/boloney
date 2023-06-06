import { FC } from "react";
import { EqualLayout, Logo } from "../../components";
import { BLANK_TARGET_LINK, BUG_FORM_LINK, FEEDBACK_FORM_LINK } from "../../constants";
import { useIsMobile } from "../../hooks";
import { Contact } from "../../molecules";
import { GeneralNavigationBar } from "../../organisms";

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
      leftSection={<Logo />}
      mainSection={<Contact handleBugFormClick={handleBugFormClick} handleFeedbackFormClick={handleFeedbackFormClick} />}
      rightSection={rightSection}
    />
  );
};
