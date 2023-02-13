import { FC } from "react";
import { SausageSpinner } from "../spinner";
import { useViewport } from "../../hooks";

import { LoadingContainer } from "./styles";

export const Loading: FC = () => {
  const { height } = useViewport();
  return (
    <LoadingContainer height={height}>
      <SausageSpinner hasLoadingText />
    </LoadingContainer>
  );
};
