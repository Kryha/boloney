import { BasicError, CustomError, StatusCodes } from "../types";
import { createMock } from "ts-auto-mock";
import * as errorHandling from "./error";

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
    const message = "Internal error";
    expect(errorHandling.parseError(StatusCodes.NOT_FOUND, code)).toEqual({ message, code, name });
  });
});

describe("Functions that require mocked input data", () => {
  let mockLogger: nkruntime.Logger;
  let message: string;
  let customError: CustomError;

  beforeEach(() => {
    mockLogger = createMock<nkruntime.Logger>();
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
});
