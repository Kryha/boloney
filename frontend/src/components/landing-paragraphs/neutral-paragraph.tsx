import { FC } from "react";
import { GeneralMessageText, Heading3 } from "../atoms";
import { ParagraphProps } from "./numbered-paragraph";
import { NeutralContainer } from "./styles";

export const NeutralParagraph: FC<ParagraphProps> = ({ heading, paragraph }) => {
  return (
    <NeutralContainer>
      <Heading3>{heading}</Heading3>
      <GeneralMessageText>{paragraph}</GeneralMessageText>
    </NeutralContainer>
  );
};
