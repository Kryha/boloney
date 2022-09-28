export interface AuthFields {
  username: string;
  password: string;
}

export enum StatusCodes {
  OK = 200,
  CONFLICT = 409,
  NOT_FOUND = 404,
}
