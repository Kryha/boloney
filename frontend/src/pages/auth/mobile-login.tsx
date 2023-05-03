import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { EqualLayout, MobileDesktopSwitch } from "../../components";
import { routes } from "../../navigation";
import { useSession } from "../../store";

export const MobileLogin: FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const route = session ? routes.home : routes.login;

  return <EqualLayout mainSection={<MobileDesktopSwitch onClick={() => navigate(route)} />} />;
};
