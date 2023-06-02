import { FC, useEffect, useRef } from "react";
import { BottomScrollerWrapper } from "./styles";

interface Props {
  list: unknown[];
}

/**
 * Organism for scrolling to bottom of list
 * @param {list} - List of items
 */

export const BottomScroller: FC<Props> = ({ list }) => {
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (list.length > 0) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  return <BottomScrollerWrapper ref={bottomRef} />;
};
