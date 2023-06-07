import { useEffect, useRef } from "react";

/**
 * This hook is used to check if the component/page has already been mounted.
 * It is used when you only want an effect to happen after the component is already mounted.
 */

export const useIsMounted = () => {
  const isMountRef = useRef(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
};
