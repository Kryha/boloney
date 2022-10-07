import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";

import { routes } from "./route-names";
import { MainContainer, ErrorFallback, ErrorView } from "../components";
import { Login, CreateAccount, NewGame, ThrowDice } from "../pages";
import { Game } from "../pages/game";

export const AppRoutes: FC = () => {
  const navigate = useNavigate();

  // TODO: add routes to navigate to when authenticated
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => navigate(routes.root)}>
      <MainContainer>
        <Routes>
          <Route path={routes.createAccount} element={<CreateAccount />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.newGame} element={<NewGame />} />
          <Route path={routes.throwDice} element={<ThrowDice />} />
          <Route path={routes.game} element={<Game />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </MainContainer>
    </ErrorBoundary>
  );
};
