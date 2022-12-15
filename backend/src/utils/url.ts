import { env } from "../constants";

export const tkUrl = (route: string) => env.TOOLKIT_BASE_URL + route;
