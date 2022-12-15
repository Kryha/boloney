import { createMock } from "ts-auto-mock";
import { CustomError } from "../types";
import { rpcHandler } from "./rpc-utils";

describe("Functions that require mocked input data", () => {
  let mockLogger: nkruntime.Logger;
  let mockNk: nkruntime.Nakama;
  let mockCtx: nkruntime.Context;
  let message: string;
  let customError: CustomError;
  const payload = { name: "payload" };

  beforeEach(() => {
    mockLogger = createMock<nkruntime.Logger>();
    mockNk = createMock<nkruntime.Nakama>();
    mockCtx = createMock<nkruntime.Context>({ userId: "mock-user" });
    message = "error";
    customError = {
      message: message,
      code: nkruntime.Codes.INTERNAL,
      name: "Error",
    };
  });

  describe("rpcHandler function", () => {
    it("Should return the payload parameter", () => {
      const mockCallBack = jest.fn((_ctx, _logger, _nk, payload) => JSON.stringify(payload)).mockReturnValueOnce(JSON.stringify(payload));
      const callback = rpcHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, JSON.stringify(payload))).toEqual(JSON.stringify(payload));
    });

    it("Should throw an Error for incorrect input", () => {
      const mockCallBack = jest
        .fn((_ctx, _logger, _nk, payload) => JSON.stringify(payload))
        .mockImplementation(() => {
          throw new TypeError("error");
        });
      const callback = rpcHandler(mockCallBack);
      expect(() => callback(mockLogger as unknown as nkruntime.Context, mockLogger, mockNk, JSON.stringify(payload))).toThrow(customError);
    });
  });
});
