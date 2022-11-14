import { useEffect, useRef } from "react";

/** provide stable ref to callback that may change so components don't need to re-render */
// eslint-disable-next-line @typescript-eslint/ban-types
export const useSavedCallback = <T extends Function>(callback: T): T => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return ref.current;
};
