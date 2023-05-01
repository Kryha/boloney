const TOOLKIT_BASE_URL_INTERNAL = "http://host.minikube.internal:5001";

export const tkUrl = (ctx: nkruntime.Context, route: string) => (ctx.env.TOOLKIT_BASE_URL || TOOLKIT_BASE_URL_INTERNAL) + route;
