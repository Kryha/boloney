import { BasicError, CustomError } from "../types";
import { createMock } from "ts-auto-mock";
import * as errorHandling from "./error-handling";
import { StatusCodes } from "./status-codes";

describe("mapHttpCodeToNakama function", () => {
  it("Should map BAD_REQUEST & NOT_FOUND Http status codes to Nakama NOT_FOUND", () => {
    expect(errorHandling.mapHttpCodeToNakama(StatusCodes.BAD_REQUEST)).toEqual(nkruntime.Codes.NOT_FOUND);
    expect(errorHandling.mapHttpCodeToNakama(StatusCodes.NOT_FOUND)).toEqual(nkruntime.Codes.NOT_FOUND);
  });

  it("Should map SWItCHING_PROTOCOLS  Http status code to Nakama UNKNOWN", () => {
    expect(errorHandling.mapHttpCodeToNakama(StatusCodes.SWITCHING_PROTOCOLS)).toEqual(nkruntime.Codes.UNKNOWN);
  });

  it("Should map UNAUTHORIZED AND FORBIDDEN Http status codes to Nakama PERMISSION_DENIED", () => {
    expect(errorHandling.mapHttpCodeToNakama(StatusCodes.UNAUTHORIZED)).toEqual(nkruntime.Codes.PERMISSION_DENIED);
    expect(errorHandling.mapHttpCodeToNakama(StatusCodes.FORBIDDEN)).toEqual(nkruntime.Codes.PERMISSION_DENIED);
  });
});

describe("parseError function", () => {
  const code = nkruntime.Codes.INTERNAL;
  const name = "Error";

  it("Should parse string error to Nakama Error", () => {
    const message = "string error";
    expect(errorHandling.parseError(message, code)).toEqual({ message, code, name });
  });

  it("Should parse Nakama Error to Nakama Error", () => {
    const error = {
      message: "error",
      code: code,
      name: name,
    } as CustomError;
    expect(errorHandling.parseError(error, code)).toEqual(error);
  });

  it("Should parse Custom Error to Custom Error", () => {
    const error = {
      message: "error",
      code: code,
      name: name,
    } as CustomError;
    expect(errorHandling.parseError(error, code)).toEqual(error);
  });

  it("Should parse BasicError and Nakama Runtime Code to Nakama Error", () => {
    const message = "error";
    const error = {
      message: message,
    } as BasicError;
    expect(errorHandling.parseError(error, code)).toEqual({ message, code, name });
  });

  it("Should parse any type of error and Nakama Code to Nakama Error", () => {
    const message = "An error occurred.";
    expect(errorHandling.parseError(StatusCodes.NOT_FOUND, code)).toEqual({ message, code, name });
  });
});

describe("Functions that require mocked input data", () => {
  let mockLogger: nkruntime.Logger;
  let mockNk: nkruntime.Nakama;
  let mockCtx: nkruntime.Context;
  let mockSession: nkruntime.Session;
  let authCustom: nkruntime.AuthenticateCustomRequest;
  let message: string;
  let customError: CustomError;
  const payload = { name: "payload" };

  beforeEach(() => {
    mockLogger = createMock<nkruntime.Logger>();
    mockNk = createMock<nkruntime.Nakama>();
    mockCtx = createMock<nkruntime.Context>({ userId: "mock-user" });
    mockSession = createMock<nkruntime.Session>();
    authCustom = {
      account: {
        id: "4321431",
        vars: { ["key"]: "variable" },
      },
      create: true,
      username: "player",
    };
    message = "error";
    customError = {
      message: message,
      code: nkruntime.Codes.INTERNAL,
      name: "Error",
    } as CustomError;
  });

  describe("handleError function", () => {
    it("Should return value nkruntime.Error", () => {
      const returnedError = {
        message: message,
        code: nkruntime.Codes.INTERNAL,
        name: "Error",
      };
      expect(errorHandling.handleError(message, mockLogger, nkruntime.Codes.INTERNAL)).toEqual(returnedError);
    });
  });

  describe("handleHttpResonse function", () => {
    it("Should return the httpResponse input", () => {
      const result = { message: "Ok" };
      const httpResponse = {
        code: StatusCodes.OK,
        headers: ["headers"],
        body: JSON.stringify(result),
      } as nkruntime.HttpResponse;
      expect(errorHandling.handleHttpResponse(httpResponse, mockLogger)).toEqual(result);
    });

    it("Should throw an Error for 404 HTTPResponse input", () => {
      const httpResponse = {
        code: StatusCodes.NOT_FOUND,
        headers: ["headers"],
        body: "error",
      } as nkruntime.HttpResponse;
      expect(() => errorHandling.handleHttpResponse(httpResponse, mockLogger)).toThrow(customError);
    });
  });

  describe("rpcHandler function", () => {
    it("Should return the payload parameter", () => {
      const mockCallBack = jest.fn((_ctx, _logger, _nk, payload) => JSON.stringify(payload)).mockReturnValueOnce(JSON.stringify(payload));
      const callback = errorHandling.rpcHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, JSON.stringify(payload))).toEqual(JSON.stringify(payload));
    });

    it("Should throw an Error for incorrect input", () => {
      const mockCallBack = jest
        .fn((_ctx, _logger, _nk, payload) => JSON.stringify(payload))
        .mockImplementation(() => {
          throw new TypeError("error");
        });
      const callback = errorHandling.rpcHandler(mockCallBack);
      expect(() => callback(mockLogger as unknown as nkruntime.Context, mockLogger, mockNk, JSON.stringify(payload))).toThrow(customError);
    });
  });

  describe("beforeHookHandler function", () => {
    it("Should return the AuthenticateCustomRequest parameter", () => {
      const mockCallBack = jest.fn((_ctx, _logger, _nk, data) => data).mockReturnValueOnce(authCustom);
      const callback = errorHandling.beforeHookHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, authCustom)).toEqual(authCustom);
    });

    it("Should throw an Error", () => {
      const mockCallBack = jest
        .fn((_ctx, _logger, _nk, data) => data)
        .mockImplementation(() => {
          throw new Error("error");
        });
      const callback = errorHandling.beforeHookHandler(mockCallBack);
      expect(() => callback(mockCtx, mockLogger, mockNk, authCustom)).toThrow(customError);
    });
  });

  describe("afterHookHandler function", () => {
    it("Should return the AuthenticateCustomRequest parameter", () => {
      const mockCallBack = jest.fn((_ctx, _logger, _nk, _data, request) => request).mockReturnValueOnce(authCustom);
      const callback = errorHandling.afterHookHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, mockSession, authCustom)).toEqual(authCustom);
    });

    it("Should throw an Error", () => {
      const mockCallBack = jest
        .fn((_ctx, _logger, _nk, data) => data)
        .mockImplementation(() => {
          throw new Error("error");
        });
      const callback = errorHandling.afterHookHandler(mockCallBack);
      expect(() => callback(mockCtx, mockLogger, mockNk, mockSession, authCustom)).toThrow(customError);
    });
  });
});
