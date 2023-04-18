import { FC, ReactNode } from "react";
import { Heading6 } from "../../atoms";
import { LeadingZeroTextWrapper } from "./styles";

interface LeadingZeroListProps {
  title?: string;
  text: ReactNode;
}

export const LeadingZeroList: FC<LeadingZeroListProps> = ({ title, text }) => {
  return (
    <>
      <Heading6>{title}</Heading6>
      <LeadingZeroTextWrapper>{text}</LeadingZeroTextWrapper>
    </>
  );
};
