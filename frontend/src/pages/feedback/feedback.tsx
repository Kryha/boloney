import { useNavigate } from "react-router-dom";
import { BLANK_TARGET_LINK, FEEDBACK_FORM_LINK } from "../../constants";
import { BaseLayout, Logo } from "../../molecules";

import { routes } from "../../navigation";
import { FeedbackSection } from "../../organisms";
import { useSession } from "../../store";

/**
 * @description Page for feedback.
 */

export const Feedback = () => {
  const session = useSession();
  const navigate = useNavigate();
  const route = session ? routes.home : routes.login;

  const handleFeedbackFormClick = () => {
    window.open(FEEDBACK_FORM_LINK, BLANK_TARGET_LINK);
    navigate(routes.home);
  };

  return (
    <BaseLayout
      leftSection={<Logo onClick={() => navigate(route)} />}
      mainSection={<FeedbackSection onFeedbackFormClick={handleFeedbackFormClick} />}
      justifyContent="space-between"
    />
  );
};
