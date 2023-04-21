import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { routes } from "./route-names";
import { CookieBanner, MainContainer, ErrorFallback, ErrorView, Loading } from "../components";
import { LandingPage, NewMatch, Home, MatchRoute, Login, CreateAccount, MobileLogin } from "../pages";
import { useRefreshAuth } from "../service";
import { useIsAuthenticating, useSession, useStore } from "../store";
import { Test } from "../pages/test/test";
import { ENV_MODE } from "../constants";
import { useIsMobile } from "../hooks";

const AppRoutes: FC = () => {
  const isAuthenticating = useIsAuthenticating();
  const session = useSession();
  const isMobile = useIsMobile();

  const loginComponent = isMobile ? <MobileLogin /> : <Login />;

  useRefreshAuth();

  if (isAuthenticating) return <Loading />;

  return (
    <Routes>
      <Route path={routes.root} element={<LandingPage />} />

      {ENV_MODE === "development" && <Route path="/test" element={<Test />} />}

      {session && !isMobile ? (
        <>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.newMatch} element={<NewMatch />} />
          <Route path={`${routes.match}/:matchId`} element={<MatchRoute />} />
        </>
      ) : (
        <>
          <Route path={routes.login} element={loginComponent} />
          {ENV_MODE !== "production" && <Route path={routes.createAccount} element={<CreateAccount />} />}
        </>
      )}

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};

export const RoutesWrapper: FC = () => {
  const navigate = useNavigate();
  const askedForConsent = useStore((state) => state.askedForConsent);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => navigate(routes.root)}>
      {!askedForConsent && <CookieBanner />}
      <AnimatePresence mode="wait">
        <MainContainer>
          <AppRoutes />
        </MainContainer>
      </AnimatePresence>
    </ErrorBoundary>
  );
};
