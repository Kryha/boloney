import { createMock } from "ts-auto-mock";
import { On, method, Method } from "ts-auto-mock/extension";

import { AccountKeys } from "../types";
import { storeNewKeysInCollection, getNewKeysFromToolkit, readUserKeys, afterAuthenticateCustom } from "./auth";

describe("After authentication hook", () => {
  let mockNk: nkruntime.Nakama;
  let mockCtx: nkruntime.Context;
  let mockLogger: nkruntime.Logger;
  let mockSession: nkruntime.Session;
  let mockAuthenticateCustomRequest: nkruntime.AuthenticateCustomRequest;
  let mockStorageReadRequest: nkruntime.StorageReadRequest;
  let mockStorageWriteAck: nkruntime.StorageWriteAck;
  let mockAccountKeys: AccountKeys;

  let mockHttpRequest: Method<nkruntime.Nakama["httpRequest"]>;
  let mockStorageRead: Method<nkruntime.Nakama["storageRead"]>;
  let mockStorageWrite: Method<nkruntime.Nakama["storageWrite"]>;
  let mockLoggerInfo: Method<nkruntime.Logger["error"]>;

  beforeEach(() => {
    mockNk = createMock<nkruntime.Nakama>();
    mockCtx = createMock<nkruntime.Context>({ userId: "mock-user" });
    mockLogger = createMock<nkruntime.Logger>();
    mockSession = createMock<nkruntime.Session>();
    mockAuthenticateCustomRequest = createMock<nkruntime.AuthenticateCustomRequest>();
    mockStorageReadRequest = createMock<nkruntime.StorageReadRequest>();
    mockStorageWriteAck = createMock<nkruntime.StorageWriteAck>();
    mockAccountKeys = createMock<AccountKeys>();

    mockLoggerInfo = On(mockLogger).get(
      method(function (mock) {
        return mock.info;
      })
    );
    mockHttpRequest = On(mockNk).get(
      method((mock) => {
        return mock.httpRequest;
      })
    );
    mockStorageRead = On(mockNk).get(
      method((mock) => {
        return mock.storageRead;
      })
    );
    mockStorageWrite = On(mockNk).get(
      method((mock) => {
        return mock.storageWrite;
      })
    );
  });

  it("Should check if an account is present in a collection", () => {
    (mockStorageRead as jest.Mock).mockReturnValueOnce([mockStorageReadRequest]);

    const payload = { collection: "Accounts", key: "keys" };

    const res = !!readUserKeys(mockNk, mockCtx, payload).length;

    expect(res).toBe(true);
  });

  it("Should write user keys to collection", () => {
    (mockStorageWrite as jest.Mock).mockReturnValueOnce([mockStorageWriteAck, mockStorageWriteAck]);

    const payload = { collection: "Accounts", key: "keys", value: { ...mockAccountKeys } };

    const res = storeNewKeysInCollection(mockNk, mockCtx, payload);

    expect(res).toBe(true);
  });

  it("Should call the toolkit", () => {
    const httpResponse: nkruntime.HttpResponse = {
      code: 200,
      headers: ["application/json"],
      body: JSON.stringify(mockAccountKeys),
    };

    (mockHttpRequest as jest.Mock).mockReturnValueOnce(httpResponse);

    const res = getNewKeysFromToolkit(mockNk, mockLogger);

    expect(res).toEqual(mockAccountKeys);
  });

  it("Should check if a user already exists", () => {
    (mockStorageRead as jest.Mock).mockReturnValueOnce([mockStorageReadRequest]);

    const expectedInfo = "User already has keys";

    afterAuthenticateCustom(mockCtx, mockLogger, mockNk, mockSession, mockAuthenticateCustomRequest);

    expect(mockLoggerInfo).toBeCalledWith(expectedInfo);
  });
});
