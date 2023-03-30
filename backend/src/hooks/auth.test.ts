import { createMock } from "ts-auto-mock";

import { CustomError } from "../types";
import { accountExist, afterHookHandler, beforeAuthenticateCustom, beforeHookHandler } from "./auth";

describe("Functions that require mocked input data", () => {
  let mockLogger: nkruntime.Logger;
  let mockNk: nkruntime.Nakama;
  let mockCtx: nkruntime.Context;
  let mockSession: nkruntime.Session;
  let authCustom: nkruntime.AuthenticateCustomRequest;
  let message: string;
  let customError: CustomError;

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
    };
  });

  describe("beforeHookHandler function", () => {
    it("Should return the AuthenticateCustomRequest parameter", () => {
      const mockCallBack = jest.fn((_ctx, _logger, _nk, data) => data).mockReturnValueOnce(authCustom);
      const callback = beforeHookHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, authCustom)).toEqual(authCustom);
    });

    it("Should throw an Error", () => {
      const mockCallBack = jest
        .fn((_ctx, _logger, _nk, data) => data)
        .mockImplementation(() => {
          throw new Error("error");
        });
      const callback = beforeHookHandler(mockCallBack);
      expect(() => callback(mockCtx, mockLogger, mockNk, authCustom)).toThrow(customError);
    });
  });

  describe("afterHookHandler function", () => {
    it("Should return the AuthenticateCustomRequest parameter", () => {
      const mockCallBack = jest.fn((_ctx, _logger, _nk, _data, request) => request).mockReturnValueOnce(authCustom);
      const callback = afterHookHandler(mockCallBack);
      expect(callback(mockCtx, mockLogger, mockNk, mockSession, authCustom)).toEqual(authCustom);
    });

    it("Should throw an Error", () => {
      const mockCallBack = jest
        .fn((_ctx, _logger, _nk, data) => data)
        .mockImplementation(() => {
          throw new Error("error");
        });
      const callback = afterHookHandler(mockCallBack);
      expect(() => callback(mockCtx, mockLogger, mockNk, mockSession, authCustom)).toThrow(customError);
    });
  });

  describe("beforeAuthenticateCustom function", () => {
    it("Should return the AuthenticateCustomRequest parameter", () => {
      mockNk.usersGetUsername = jest.fn().mockImplementation((_smh: string[]) => "");
      mockNk.sha256Hash = jest.fn().mockImplementation((_smh: string) => authCustom.account?.id);
      const authCustomCopy = { ...authCustom };
      const res = beforeAuthenticateCustom(mockCtx, mockLogger, mockNk, authCustom);
      expect(res).toEqual(authCustomCopy);
    });
  });

  describe("beforeAuthenticateCustom function", () => {
    it("Should return the modified AuthenticateCustomRequest parameter", () => {
      mockNk.usersGetUsername = jest.fn().mockImplementation((_smh: string[]) => "");
      mockNk.sha256Hash = jest.fn().mockImplementation((_smh: string) => "hashedPassword");
      const authCustomCopy = { ...authCustom };
      const res = beforeAuthenticateCustom(mockCtx, mockLogger, mockNk, authCustom);
      expect(res).not.toEqual(authCustomCopy);
    });
  });

  describe("accountExists function", () => {
    it("Should return false", () => {
      mockNk.storageRead = jest.fn().mockImplementation((_smh: unknown) => undefined);
      const res = accountExist(mockNk, mockLogger, authCustom.username || "");
      expect(res).toEqual(false);
    });

    it("Should return true", () => {
      const storageReadResponse = [
        {
          value: {
            address: "aleo1" + "0".repeat(58),
          },
        },
      ];
      mockNk.storageRead = jest.fn().mockImplementation((_smh: unknown) => storageReadResponse);
      const res = accountExist(mockNk, mockLogger, authCustom.username || "");
      expect(res).toEqual(true);
    });
  });
});
