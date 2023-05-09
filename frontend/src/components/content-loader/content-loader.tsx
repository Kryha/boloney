import { FC } from "react";
import { SausageSpinner } from "../spinner";
import { SpinnerContainer } from "./styles";

interface ContentLoaderProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export const LoadingPage: FC = () => (
  <SpinnerContainer>
    <SausageSpinner />
  </SpinnerContainer>
);

export const ContentLoader: FC<ContentLoaderProps> = ({ isLoading, children }) => {
  return <>{isLoading ? <LoadingPage /> : children}</>;
};
