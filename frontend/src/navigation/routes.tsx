import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";

import { routes } from "./route-names";
import { MainContainer, ErrorFallback, ErrorView, Loading } from "../components";
import { Login, CreateAccount } from "../pages/auth";
import { Landing, NewMatch, Home, MatchRoute } from "../pages";
import { useRefreshAuth } from "../service";
import { useIsAuthenticating, useSession } from "../store";

const AppRoutes: FC = () => {
  const isAuthenticating = useIsAuthenticating();
  const session = useSession();

  useRefreshAuth();

  if (isAuthenticating) return <Loading />;

  return (
    <Routes>
      <Route path={routes.root} element={<Landing />} />

      {session ? (
        <>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.newMatch} element={<NewMatch />} />
          <Route path={`${routes.match}/:matchId`} element={<MatchRoute />} />
        </>
      ) : (
        <>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.createAccount} element={<CreateAccount />} />
        </>
      )}

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};

export const RoutesWrapper: FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => navigate(routes.root)}>
      <MainContainer>
        <AppRoutes />
      </MainContainer>
    </ErrorBoundary>
  );
};
