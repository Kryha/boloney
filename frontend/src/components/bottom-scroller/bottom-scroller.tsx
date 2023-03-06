import { FC, useEffect, useRef } from "react";
import { BottomScrollerWrapper } from "./styles";

interface Props {
  list: unknown[];
}

export const BottomScroller: FC<Props> = ({ list }) => {
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  return <BottomScrollerWrapper ref={bottomRef} />;
};
