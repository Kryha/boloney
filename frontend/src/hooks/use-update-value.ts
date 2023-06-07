import { useEffect, useState } from "react";
import { NOTIFICATION_VISIBILITY_TIME } from "../constants";

/**
 * This hook is used to in conjunction with a timer to return a true value after the timer amount has passed.
 * Its initial value is false and will return true once the timer has run out.
 */

export const useUpdateValue = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, NOTIFICATION_VISIBILITY_TIME);

    return () => clearTimeout(timeout);
  }, [show]);
};
