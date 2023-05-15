import { radius } from "../design";

export const dieSelectorGridTemplateColumns = {
  bidView: "repeat(3, 1fr)",
  hudView: "repeat(7, 1fr)",
};

export const dieSizes = {
  maxWidth: "clamp(240px, 25vw + 0px, 480px)",
  minHeight: "clamp(66px, 6.98vw + -1px, 133px)",
  selectedDie: "clamp(70px, 7.6vw + -3px, 143px)",
  hudDoubleRow: "5vh",
  hudSingleRow: "7vh",
  borderRadius: radius.sm,
};
