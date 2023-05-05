import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { BodyText, Heading2, Heading3, Heading4, Heading5 } from "../../atoms";
import { MdWrapper } from "./styles";

interface MdComponentProps {
  text: string;
}

export const MdComponent: FC<MdComponentProps> = ({ text }) => {
  return (
    <MdWrapper>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <Heading2 {...props} />,
          h2: ({ ...props }) => <Heading3 {...props} />,
          h3: ({ ...props }) => <Heading4 {...props} />,
          h4: ({ ...props }) => <Heading5 {...props} />,
          p: ({ ...props }) => <BodyText {...props} />,
        }}
      >
        {text}
      </ReactMarkdown>
    </MdWrapper>
  );
};
