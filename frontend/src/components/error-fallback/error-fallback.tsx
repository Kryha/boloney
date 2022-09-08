import { ErrorView } from "../error-view";

export const ErrorFallback = (resetErrorBoundary: (...args: Array<unknown>) => void) => <ErrorView onButtonClick={resetErrorBoundary} />;
