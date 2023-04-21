export interface FontProps {
  sm: string;
  md: string;
  lg: string;
}

export type TransformText = "capitalize" | "uppercase" | "lowercase" | "none";

export const fontSizes = {
  // These values are for buttons and links
  tiny: "14px",
  small: "16px",
  large: "60px",
  primaryButton: {
    sm: "clamp(3.13rem, 1.52vw + 2.84rem, 3.75rem)",
    md: "clamp(2.5rem, 1.04vw + 1.88rem, 3.13rem)",
    lg: "clamp(3.13rem, 1.56vw + 1.25rem, 5rem)",
  },
  infoDisplay: {
    sm: "clamp(7.5rem, 9.09vw + 5.8rem, 11.25rem)",
    md: "clamp(11.63rem, 11.88vw + 4.5rem, 18.75rem)",
    lg: "clamp(18.75rem, 18.62vw + -3.59rem, 40.63rem)",
  },
  heading1: {
    sm: "clamp(5.63rem, 1.52vw + 5.34rem, 6.25rem)",
    md: "clamp(5.63rem, 7vw + -1.25rem, 9rem)",
    lg: "clamp(9rem, 6.17vw + 1.6rem, 16.25rem)",
  },
  heading2B: {
    sm: "clamp(2.5rem, 1.52vw + 2.22rem, 3.13rem)",
    md: "clamp(5.63rem, 7vw + -1.25rem, 9rem)",
    lg: "clamp(9rem, 6.17vw + 1.6rem, 16.25rem)",
  },
  heading2: {
    sm: "clamp(1.75rem, 1.52vw + 1.47rem, 2.38rem)",
    md: "clamp(1.88rem, 3.13vw + 0rem, 3.75rem)",
    lg: "clamp(3.75rem, 4.39vw + -3.65rem, 6.88rem)",
  },
  heading3: {
    sm: "clamp(4.19rem, 1.52vw + 3.9rem, 4.81rem)",
    md: "clamp(1.5rem, 2.29vw + 0.13rem, 2.88rem)",
    lg: "clamp(2.88rem, 3.09vw + -0.83rem, 6.5rem)",
  },
  heading4: {
    sm: "clamp(1.38rem, 0.61vw + 1.26rem, 1.63rem)",
    md: "clamp(1.25rem, 0.83vw + 0.75rem, 1.75rem)",
    lg: "clamp(1.75rem, 1.04vw + 0.5rem, 3rem)",
  },
  heading5: {
    sm: "clamp(1rem, 0.61vw + 0.89rem, 1.25rem)",
    md: "clamp(0.82rem, 0.72vw + 0.39rem, 1.25rem)",
    lg: "clamp(1.25rem, 1.33vw + -0.35rem, 2.81rem);",
  },
  heading6: {
    sm: "clamp(1rem, 0.61vw + 0.89rem, 1.25rem)",
    md: "clamp(0.88rem, 0.21vw + 0.75rem, 1rem)",
    lg: "clamp(1rem, 0.83vw + 0rem, 2rem)",
  },
  body: {
    sm: "clamp(1rem, 0.61vw + 0.89rem, 1.25rem)",
    md: "clamp(0.88rem, 0.21vw + 0.75rem, 1rem)",
    lg: "clamp(1rem, 0.74vw + 0.11rem, 1.88rem)",
  },
  toolTip: {
    sm: "clamp(0.5rem, 0.36vw + 0.41rem, 0.63rem)",
    md: "clamp(0.75rem, 0.31vw + 0.56rem, 0.94rem)",
    lg: "clamp(0.94rem, 0.48vw + 0.36rem, 1.5rem)",
  },
  playerInfo: {
    sm: "clamp(0.63rem, 0.71vw + 0.45rem, 0.88rem)",
    md: "clamp(0.88rem, 0.42vw + 0.63rem, 1.13rem)",
    lg: "clamp(1.13rem, 0.43vw + 0.61rem, 1.63rem)",
  },
  generalText: {
    sm: "clamp(0.63rem, 0.73vw + 0.44rem, 0.88rem)",
    md: "clamp(0.88rem, 0.21vw + 0.75rem, 1rem)",
    lg: "clamp(1rem, 0.83vw + 0rem, 2rem)",
  },
  timestamp: {
    sm: "clamp(0.56rem, 0.54vw + 0.43rem, 0.75rem)",
    md: "clamp(0.75rem, 0.63vw + 0.38rem, 1.13rem)",
    lg: "clamp(1.13rem, 0.53vw + 0.49rem, 1.75rem)",
  },
};

export const lineHeights = {
  small: "34px",
  medium: "44px",
  primaryButton: {
    sm: "clamp(3.13rem, 1.52vw + 2.84rem, 3.75rem)",
    md: "clamp(2.13rem, 1.04vw + 1.5rem, 2.75rem)",
    lg: "clamp(3.38rem, 1.56vw + 1.5rem, 5.25rem)",
  },
  infoDisplay: {
    sm: "clamp(7.5rem, 9.09vw + 5.8rem, 11.25rem)",
    md: "clamp(10.5rem, 11.67vw + 3.5rem, 17.5rem)",
    lg: "clamp(19rem, 18.62vw + -3.34rem, 40.88rem)",
  },
  landingDisplay: {
    sm: "clamp(7.5rem, 9.09vw + 5.8rem, 11.25rem)",
    md: "clamp(9rem, 8.33vw + 4rem, 14rem)",
    lg: "clamp(19rem, 18.62vw + -3.34rem, 40.88rem)",
  },
  heading1: {
    sm: "clamp(6.25rem, 6.06vw + 5.11rem, 8.75rem)",
    md: "clamp(4.5rem, 4.05vw + 2.07rem, 6.93rem)",
    lg: "clamp(9.25rem, 6.17vw + 1.85rem, 16.5rem)",
  },
  heading2B: {
    sm: "clamp(3rem, 1.52vw + 2.72rem, 3.63rem)",
    md: "clamp(2.25rem, 2.71vw + 0.63rem, 3.88rem)",
    lg: "clamp(4rem, 4.39vw + -3.4rem, 7.13rem)",
  },
  heading2: {
    sm: "clamp(2rem, 1.52vw + 1.72rem, 2.63rem)",
    md: "clamp(2.25rem, 2.71vw + 0.63rem, 3.88rem)",
    lg: "clamp(4rem, 4.39vw + -3.4rem, 7.13rem)",
  },
  heading3: {
    sm: "clamp(4.19rem, 1.52vw + 3.9rem, 4.81rem)",
    md: "clamp(1.63rem, 2.29vw + 0.25rem, 3rem)",
    lg: "clamp(3.13rem, 3.09vw + -0.58rem, 6.75rem)",
  },
  heading4: {
    sm: "clamp(1.5rem, 0.61vw + 1.39rem, 1.75rem)",
    md: "clamp(1.38rem, 1.04vw + 0.75rem, 2rem)",
    lg: "clamp(3.13rem, 1.7vw + 1.08rem, 5.13rem)",
  },
  heading5: {
    sm: "clamp(1.5rem, 0.61vw + 1.39rem, 1.75rem)",
    md: "clamp(1.63rem, 1.33vw + 0.03rem, 3.19rem)",
    lg: "clamp(3.13rem, 1.7vw + 1.08rem, 5.13rem)",
  },
  heading6: {
    sm: "clamp(1rem, 0.61vw + 0.89rem, 1.25rem)",
    md: "clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem)",
    lg: "clamp(1.75rem, 0.85vw + 0.73rem, 2.75rem)",
  },
  body: {
    sm: "clamp(1.25rem, 0.61vw + 1.14rem, 1.5rem)",
    md: "clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem)",
    lg: "clamp(1.25rem, 0.74vw + 0.36rem, 2.13rem)",
  },
  toolTip: {
    xs: "clamp(4.38rem, 3.03vw + 3.81rem, 5.63rem)",
    sm: "clamp(0.88rem, 0.36vw + 0.79rem, 1rem)",
    md: "clamp(1.13rem, 0.31vw + 0.94rem, 1.31rem)",
    lg: "clamp(1.31rem, 0.48vw + 0.74rem, 1.88rem)",
  },
  playerInfo: {
    xs: "clamp(4.38rem, 3.03vw + 3.81rem, 5.63rem)",
    sm: "clamp(0.63rem, 0.71vw + 0.45rem, 0.88rem)",
    md: "clamp(0.88rem, 0.42vw + 0.63rem, 1.13rem)",
    lg: "clamp(1.13rem, 0.43vw + 0.61rem, 1.63rem)",
  },
  generalText: {
    xs: "clamp(4.38rem, 3.03vw + 3.81rem, 5.63rem)",
    sm: "clamp(1.13rem, 0.71vw + 0.95rem, 1.38rem)",
    md: "clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem)",
    lg: "clamp(2rem, 0.73vw + 1.13rem, 2.88rem)",
  },
  timestamp: {
    xs: "clamp(4.38rem, 3.03vw + 3.81rem, 5.63rem)",
    sm: "clamp(0.56rem, 0.54vw + 0.43rem, 0.75rem)",
    md: "clamp(0.75rem, 0.63vw + 0.38rem, 1.13rem)",
    lg: "clamp(1.13rem, 0.53vw + 0.49rem, 1.75rem)",
  },
};

export type FontWeight = "400" | "500" | "600" | "700";

export const fontWeights = {
  lighter: "200",
  light: "400",
  regular: "500",
  bold: "600",
  bolder: "700",
};

export const fonts = {
  primary: "ibm-plex-mono",
  secondary: "itc-clearface-regular",
  tertiary: "itc-clearface-bold",
};
