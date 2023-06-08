import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { routes } from "./route-names";
import { CookieBanner, MainContainer, Loading } from "../components";
import { LandingPage, MatchRoute, Login, CreateAccount, MobileLogin, MdPage } from "../pages";
import { useRefreshAuth } from "../service";
import { useIsAuthenticating, useSession, useStore } from "../store";
import { Test } from "../pages/test/test";
import { ENV_MODE } from "../constants";
import { PrivacyPolicyMd, CookiePolicyMd, TermsOfUseMd } from "../assets";
import { useIsMobile } from "../hooks";
import { CreateMatchPage, ContactPage, FeedbackPage, HomePage } from "../views";
import { ErrorFallback, ErrorView } from "../organisms";

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
      <Route path={routes.contact} element={<ContactPage />} />
      <Route path={routes.feedback} element={<FeedbackPage />} />

      <Route path={routes.privacy} element={<MdPage mdMetaData={PrivacyPolicyMd.default} />} />
      <Route path={routes.cookies} element={<MdPage mdMetaData={CookiePolicyMd.default} />} />
      <Route path={routes.termsOfUse} element={<MdPage mdMetaData={TermsOfUseMd.default} />} />

      {ENV_MODE === "development" && <Route path="/test" element={<Test />} />}
      {session && !isMobile ? (
        <>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.newMatch} element={<CreateMatchPage />} />
          <Route path={`${routes.match}/:matchId`} element={<MatchRoute />} />
        </>
      ) : (
        <>
          <Route path={routes.login} element={loginComponent} />
          <Route path={routes.createAccount} element={<CreateAccount />} />
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
