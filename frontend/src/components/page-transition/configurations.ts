export const fadeInConfiguration = (delay: number) => ({
  initial: {
    opacity: 0,
    transition: {
      delay: delay,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      delay: delay,
    },
  },
  exit: { opacity: 0 },
});
