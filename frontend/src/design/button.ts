import { spacing } from "./spacing";

export const buttonSize = {
  xs: `${spacing.xs} ${spacing.s}`,
  sm: `${spacing.s} ${spacing.s} ${spacing.s} ${spacing.sm}`,
  md: `${spacing.s} ${spacing.sm}`,
  lg: "2px clamp(0.5rem, 0.28vw + 0.33rem, 1rem) clamp(0.5rem, 0.28vw + 0.33rem, 1rem) clamp(0.5rem, 0.28vw + 0.33rem, 1rem)",
  xl: `${spacing.s} 0px ${spacing.s} ${spacing.sm}`,
  fluid: "100%",
  auto: "auto",
};
