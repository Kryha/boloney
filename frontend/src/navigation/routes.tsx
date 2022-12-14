import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";

import { routes } from "./route-names";
import { MainContainer, ErrorFallback, ErrorView, Loading } from "../components";
import { Login, CreateAccount } from "../pages/auth";
import { Landing, NewMatch, Home, Match } from "../pages";
import { useAuth } from "../service";

const AppRoutes: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path={routes.root} element={<Landing />} />

      {isAuthenticated ? (
        <>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.newMatch} element={<NewMatch />} />
          <Route path={`${routes.match}/:matchId`} element={<Match />} />
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
  const { isRefreshing } = useAuth();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => navigate(routes.root)}>
      <MainContainer>{isRefreshing ? <Loading /> : <AppRoutes />}</MainContainer>
    </ErrorBoundary>
  );
};
