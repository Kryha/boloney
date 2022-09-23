import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";

import { routes } from "./route-names";
import { MainContainer, ErrorFallback, ErrorView } from "../components";
import { Login, ThrowDice } from "../pages";

export const AppRoutes: FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => navigate(routes.root)}>
      <MainContainer>
        <Routes>
          <Route path={routes.createAccount} element={<Login />} />
          <Route path={routes.throwDice} element={<ThrowDice />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </MainContainer>
    </ErrorBoundary>
  );
};
