import { routes } from "../navigation";

export const cleanUUID = (matchId: string) => matchId.split(".")[0];

export const parseMatchUrl = (matchId: string) => `${window.location.origin}${routes.match}/${cleanUUID(matchId)}`;

export const parseMatchIdParam = (param?: string) => (param ? `${param}.nakama` : undefined);
