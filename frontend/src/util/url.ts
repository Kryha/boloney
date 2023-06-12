import { routes } from "../navigation";

export const cleanUUID = (matchId: string) => matchId.split(".")[0];

export const parseMatchUrl = (matchId: string) => `${window.location.origin}${routes.match}/${cleanUUID(matchId)}`;

export const parseMatchIdParam = (param?: string) => (param ? `${param}.nakama` : undefined);

export const isAuthenticationRoute = (path: string) => {
  const authRoutes = [routes.login, routes.root, routes.contact];
  return authRoutes.includes(path);
};

export const isKnownRoute = (path: string) => {
  const knownRoutes = Object.values(routes);
  return knownRoutes.includes(path) || path.includes(routes.match);
};

export const isLegalContentRoute = (path: string) => {
  const legalContentRoutes = [routes.privacy, routes.cookies, routes.termsOfUse, routes.contact];
  return legalContentRoutes.includes(path);
};
