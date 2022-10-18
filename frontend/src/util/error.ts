import { NkCode, NkError, nkErrorSchema } from "../types";

export const parseError = async (error: unknown): Promise<NkError> => {
  const unknownErr = { code: NkCode.UNKNOWN, message: "Unknown error" };

  if (error instanceof Error) return { code: NkCode.UNKNOWN, message: error.message };

  if (!(error instanceof Response)) return unknownErr;

  const body = await error.json();
  const parsed = await nkErrorSchema.safeParseAsync(body);

  if (!parsed.success) return unknownErr;

  return parsed.data;
};
