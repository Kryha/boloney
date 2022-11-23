import { BasicError } from "../types";
import { createMock } from "ts-auto-mock";
import * as errorHandling from "./error-handling";

const ERROR_NOT_FOUND = 404;
const SUCCESS_STATUS_CODE = 201;

// TODO: Add test cases that assert the errors thrown.
describe("parseError function", () => {
  const code = nkruntime.Codes.INTERNAL;

  it("Should assert that error isString", () => {
    const message = "string error";
    expect(errorHandling.parseError(message, code)).toEqual({ message, code });
  });
  it("Should assert that error isNkError", () => {
    const error = {
      message: "error",
      code: code,
    } as nkruntime.Error;
    expect(errorHandling.parseError(error, code)).toEqual(error);
  });
  it("Should assert that error isBasicError", () => {
    const message = "error";
    const error = {
      message: message,
    } as BasicError;
    expect(errorHandling.parseError(error, code)).toEqual({ message, code });
  });
  it("Should assert that error is nkruntime.Error", () => {
    const message = "An error occurred.";
    expect(errorHandling.parseError(ERROR_NOT_FOUND, code)).toEqual({ message, code });
  });
});

describe("", () => {
  let mockLogger: nkruntime.Logger;
  let mockNk: nkruntime.Nakama;
  let mockCtx: nkruntime.Context;
  let mockSession: nkruntime.Session;

  beforeEach(() => {
    mockLogger = createMock<nkruntime.Logger>();
    mockNk = createMock<nkruntime.Nakama>();
    mockCtx = createMock<nkruntime.Context>({ userId: "mock-user" });
    mockSession = createMock<nkruntime.Session>();
  });

  describe("handleError function", () => {
    it("Should assert that return value is nkruntime.Error", () => {
      const error = {
        message: "error",
        code: nkruntime.Codes.INTERNAL,
      } as nkruntime.Error;
      jest.spyOn(errorHandling, "parseError").mockReturnValueOnce(error);
      expect(errorHandling.handleError(error, mockLogger, error.code)).toEqual(error);
    });
  });

  describe("handleHttpResonse function", () => {
    it("Should assert that httpResponse was successful", () => {
      const result = { message: "Ok" };
      const httpResponse = {
        code: SUCCESS_STATUS_CODE,
        headers: ["headers"],
        body: JSON.stringify(result),
      } as nkruntime.HttpResponse;
      expect(errorHandling.handleHttpResponse(httpResponse, mockLogger)).toEqual(result);
    });
  });

  describe("rpcHandler function", () => {
    it("Should assert that returned value matches the payload", () => {
      const payload = { name: "payload" };
      const mockCallBack = jest.fn((_ctx, _logger, _nk, payload) => JSON.stringify(payload)).mockReturnValueOnce(JSON.stringify(payload));
      const callback = errorHandling.rpcHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, JSON.stringify(payload))).toEqual(JSON.stringify(payload));
    });
  });

  describe("beforeHookHandler function", () => {
    it("Should assert that the returned value matches AuthenticateCustomRequest received", () => {
      const res = {
        account: {
          id: "4321431",
          vars: { ["key"]: "variable" },
        },
        create: true,
        username: "player",
      } as nkruntime.AuthenticateCustomRequest;
      const mockCallBack = jest.fn((_ctx, _logger, _nk, data) => data).mockReturnValueOnce(res);
      const callback = errorHandling.beforeHookHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, res)).toEqual(res);
    });
  });

  describe("beforeHookHandler function", () => {
    it("Should assert that the returned value matches AuthenticateCustomRequest received", () => {
      const res = {
        account: {
          id: "4321431",
          vars: { ["key"]: "variable" },
        },
        create: true,
        username: "player",
      } as nkruntime.AuthenticateCustomRequest;
      const mockCallBack = jest.fn((_ctx, _logger, _nk, _data, request) => request).mockReturnValueOnce(res);
      const callback = errorHandling.afterHookHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, mockSession, res)).toEqual(res);
    });
  });
});
