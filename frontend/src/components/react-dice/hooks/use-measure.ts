import { useEffect, useRef } from "react";

/**
 * Measure width and height of reference element
 * TODO: throttle? Also use ref to canvas instead?
 */
export const useMeasure = (onChange: (width: number, height: number) => void): void => {
  const savedCallback = useRef(onChange);

  useEffect(() => {
    savedCallback.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const callback = () => {
      savedCallback.current(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", callback);

    callback();

    return () => window.removeEventListener("resize", callback);
  }, []);
};
