import { FC } from "react";
import { SausageSpinner } from "../spinner";
import { SpinnerContainer } from "./styles";

interface ContentLoaderProps {
  loading: boolean;
  children?: React.ReactNode;
}

export const LoadingPage: FC = () => (
  <SpinnerContainer>
    <SausageSpinner />
  </SpinnerContainer>
);

export const ContentLoader: FC<ContentLoaderProps> = ({ loading, children }) => {
  return <>{loading ? <LoadingPage /> : children}</>;
};
