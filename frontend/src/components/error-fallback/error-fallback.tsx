import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { ErrorView } from "../error-view";

export const ErrorFallback: FC<FallbackProps> = ({ resetErrorBoundary }) => <ErrorView onButtonClick={resetErrorBoundary} />;
