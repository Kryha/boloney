export interface AuthFields {
  username: string;
  password: string;
}

export enum StatusCodes {
  CONFLICT = 409,
  NOT_FOUND = 404,
}
