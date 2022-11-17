import { NkError } from "./error";

export type NkResponse<T = void> = NkError | T;
