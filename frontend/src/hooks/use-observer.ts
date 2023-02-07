import { useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface Props {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

export const useObserver = (): Props => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  return {
    ref,
    isVisible,
  };
};
