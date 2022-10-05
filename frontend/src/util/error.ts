import { NkCode, NkError, NkErrorSchema } from "../interfaces";

export const parseError = async (error: unknown): Promise<NkError> => {
  const unknownErr = { code: NkCode.UNKNOWN, message: "Unknown error" };

  if (!(error instanceof Response)) return unknownErr;

  const body = await error.json();
  const parseRes = await NkErrorSchema.safeParseAsync(body);

  if (!parseRes.success) return unknownErr;

  return parseRes.data;
};
