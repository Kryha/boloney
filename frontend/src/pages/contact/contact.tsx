import { FC } from "react";
import { EqualLayout, Logo } from "../../components";
import { BLANK_TARGET_LINK, BUG_FORM_LINK, FEEDBACK_FORM_LINK } from "../../constants";
import { useIsMobile } from "../../hooks";
import { Contact } from "../../molecules";
import { NavigationBar } from "../../organisms";
import { useSession } from "../../store";

export const ContactPage: FC = () => {
  const session = useSession();
  const isMobile = useIsMobile();
  const rightSection = isMobile ? <></> : <NavigationBar isAuthenticated={!!session} />;

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
