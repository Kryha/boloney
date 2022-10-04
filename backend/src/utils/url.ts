import { env } from "./const";

export const tkUrl = (route: string) => env.TOOLKIT_BASE_URL + route;
