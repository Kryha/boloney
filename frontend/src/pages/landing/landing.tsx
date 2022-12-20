import { Navigate } from "react-router-dom";

import { routes } from "../../navigation";
import { useSession } from "../../store";

// TODO: implement as per designs
// The landing page will have:
// - About
// - Rules/How to play
// - Actions to take
// - Create new game
// - Join an existing game
// - Copyright
// - Privacy & terms
export const Landing = () => {
  const session = useSession();

  return <Navigate to={session ? routes.home : routes.login} />;
};
