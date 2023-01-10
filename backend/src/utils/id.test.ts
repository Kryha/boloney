import { createMock } from "ts-auto-mock";

import { decodeId, encodeId } from "./id";

describe("ID encoding and decoding", () => {
  const MOCK_USER_ID = "0baea867-d510-43f5-8e10-0b2ac342c49e";
  const MOCK_MATCH_ID = "4978abfd-96d0-4971-a1a8-aca1ab8070cf";

  let mockCtx: nkruntime.Context;

  beforeEach(() => {
    mockCtx = createMock<nkruntime.Context>({ userId: MOCK_USER_ID, matchId: MOCK_MATCH_ID });
  });

  it("should return initial value after encode/decode for a user id", () => {
    const { userId } = mockCtx;

    const encodedId = encodeId(userId);
    expect(encodedId).toBeTruthy();
    if (!encodedId) return;

    const decodedId = decodeId(encodedId);
    expect(decodedId).toBe(userId);
  });

  it("should return initial value after encode/decode for a match id", () => {
    const { matchId } = mockCtx;

    const encodedId = encodeId(matchId);
    expect(encodedId).toBeTruthy();
    if (!encodedId) return;

    const decodedId = decodeId(encodedId);
    expect(decodedId).toBe(matchId);
  });
});
