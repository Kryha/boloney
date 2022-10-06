import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";

import { routes } from "./route-names";
import { MainContainer, ErrorFallback, ErrorView } from "../components";
import { Login, CreateAccount } from "../pages/auth";
import { Landing } from "../pages";
import { useAuth } from "../service";
import { Home } from "../pages/home";

const AppRoutes: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path={routes.root} element={<Landing />} />

      {/* if you try to abstract these cases in external components, the compiler will complain for some reason */}
      {isAuthenticated ? (
        <>
          <Route path={routes.home} element={<Home />} />
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
      {/* TODO: create loading component */}
      <MainContainer>{isRefreshing ? <>Authenticating...</> : <AppRoutes />}</MainContainer>
    </ErrorBoundary>
  );
};
