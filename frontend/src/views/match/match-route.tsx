import { FC } from "react";
import { useParams } from "react-router-dom";

import { ErrorView } from "../../organisms";
import { parseMatchIdParam } from "../../util";
import { Match } from "./match";

export const MatchRoute: FC = () => {
  const { matchId } = useParams();
  if (!matchId) return <ErrorView />;

  const parsedId = parseMatchIdParam(matchId);
  if (!parsedId) return <ErrorView />;

  return <Match matchId={parsedId} />;
};
