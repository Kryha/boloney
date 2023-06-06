import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../molecules";
import { routes } from "../../navigation";
import { useSession } from "../../store";

/**
 * This is the text version of the boloney logo. It is usually displayed on the left section of the base/equal layout.
 */

export const TextLogo: FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const route = session ? routes.home : routes.root;

  return <Logo onClick={() => navigate(route)} />;
};
