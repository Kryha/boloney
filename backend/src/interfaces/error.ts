export interface BasicError {
  message: string;
}

export const isBasicError = (error: unknown): error is BasicError => {
  return !!(error && typeof error === "object" && "message" in error);
};
