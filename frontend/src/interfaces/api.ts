import { NkError } from "./error";

export type NkResponse<T = undefined> = NkError | T;
