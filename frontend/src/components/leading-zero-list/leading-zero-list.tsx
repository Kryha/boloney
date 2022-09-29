import { FC, ReactNode } from "react";
import { Heading6 } from "../atoms";

interface LeadingZeroListProps {
  text: ReactNode;
}

export const LeadingZeroList: FC<LeadingZeroListProps> = ({ text }) => {
  return (
    <>
      <Heading6 />
      {text}
    </>
  );
};
