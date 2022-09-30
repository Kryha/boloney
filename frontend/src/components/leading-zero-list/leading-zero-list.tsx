import { FC, ReactNode } from "react";
import { Heading6 } from "../atoms";
import { LeadingZeroTextWrapper } from "./styles";

interface LeadingZeroListProps {
  text: ReactNode;
}

export const LeadingZeroList: FC<LeadingZeroListProps> = ({ text }) => {
  return (
    <>
      <Heading6 />
      <LeadingZeroTextWrapper>{text}</LeadingZeroTextWrapper>
    </>
  );
};
