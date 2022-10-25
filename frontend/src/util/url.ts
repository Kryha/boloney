import { routes } from "../navigation";

export const splitMatchId = (matchId: string) => matchId.split(".")[0];

export const parseLobbyUrl = (matchId: string) => `${window.location.origin}${routes.lobby}/${splitMatchId(matchId)}`;

export const parseMatchIdParam = (param?: string) => (param ? `${param}.nakama` : undefined);
