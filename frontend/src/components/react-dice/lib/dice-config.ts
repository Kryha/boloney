import { ReactThreeFiber } from "@react-three/fiber";

type NewType = ReactThreeFiber.Color;

/** troika-sdf-text config, see: https://github.com/pmndrs/drei/blob/master/src/core/Text.tsx */
export type TextConfig = JSX.IntrinsicElements["mesh"] & {
  characters?: string;
  color?: NewType;
  fontSize?: number;
  maxWidth?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: "left" | "right" | "center" | "justify";
  font?: string;
  anchorX?: number | "left" | "center" | "right";
  anchorY?: number | "top" | "top-baseline" | "middle" | "bottom-baseline" | "bottom";
  clipRect?: [number, number, number, number];
  depthOffset?: number;
  direction?: "auto" | "ltr" | "rtl";
  overflowWrap?: "normal" | "break-word";
  whiteSpace?: "normal" | "overflowWrap" | "overflowWrap";
  outlineWidth?: number | string;
  outlineOffsetX?: number | string;
  outlineOffsetY?: number | string;
  outlineBlur?: number | string;
  outlineColor?: ReactThreeFiber.Color;
  outlineOpacity?: number;
  strokeWidth?: number | string;
  strokeColor?: ReactThreeFiber.Color;
  strokeOpacity?: number;
  fillOpacity?: number;
  debugSDF?: boolean;
  onSync?: (troika: any) => void;
};

/** Overwrite default dice configuration */
export interface DiceConfig {
  color: string;
  textConfig: TextConfig;
}

export const defaultConfig: DiceConfig = {
  color: "#3356F2",
  textConfig: {
    color: "#8491a3",
    fontSize: 0.5,
  },
};
