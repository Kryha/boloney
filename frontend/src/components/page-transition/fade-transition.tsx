import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { FADE_TRANSITION_DURATION } from "../../constants";
import { fadeInConfiguration } from "./configurations";

interface Props {
  children: ReactNode;
  delay?: number;
  animationKey?: string;
}

export const FadeTransition: FC<Props> = ({ children, delay = 0, animationKey }) => {
  const variants = fadeInConfiguration(delay);
  return (
    <motion.div
      key={animationKey}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: FADE_TRANSITION_DURATION }}
    >
      {children}
    </motion.div>
  );
};
