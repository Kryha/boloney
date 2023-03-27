import { SIDEBAR_HEIGHT } from "../design";

export const getSidebarHeight = (divisors: number) => {
  return SIDEBAR_HEIGHT / divisors;
};

export const switchStyle = (initialStyle: string, secondaryStyle: string, condition?: string | boolean): string => {
  return condition ? initialStyle : secondaryStyle;
};
