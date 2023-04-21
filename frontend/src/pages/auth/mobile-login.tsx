import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { EqualLayout, MobileDesktopSwitch } from "../../components";
import { routes } from "../../navigation";

export const MobileLogin: FC = () => {
  const navigate = useNavigate();

  return <EqualLayout mainSection={<MobileDesktopSwitch onClick={() => navigate(routes.root)} />} />;
};
