import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FC, useEffect, useState } from "react";
import { BodyText, Heading2, Heading3, Heading4, Heading5 } from "../../atoms";
import { PrivacyWrapper } from "./styles";
import remarkGfm from "remark-gfm";
import { EqualLayout, LeftLandingSideBar, RightLandingSideBar } from "../../components";
import { useStore } from "../../store";
import { useIsMobile} from "../../hooks";

interface MdPageProps {
  mdMetaData: string;
}

// TODO: Extract Markdown Component.
export const MdPage : FC<MdPageProps> = ({mdMetaData}) => {
  const isSidebarVisible = useStore((state) => state.isSidebarVisible);
  const isMobile = useIsMobile();
  const [text, setText] = useState("");
  const leftSection = isMobile || <LeftLandingSideBar isSidebarVisible={isSidebarVisible} />;
  const rightSection = isMobile || <RightLandingSideBar isSidebarVisible={isSidebarVisible} />;

  useEffect(() => {
    const firstPath= mdMetaData;

    fetch(firstPath)
      .then((response) => {
        return response.text();
      })
      .then((text) => setText(text));
  }, [mdMetaData]);

  return (
    <>
      <EqualLayout
        leftSection={leftSection}
        mainSection={
          <PrivacyWrapper>
            <ReactMarkdown
              // eslint-disable-next-line react/no-children-prop
              children={text}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => <Heading2 {...props} />,
                h2: ({ ...props }) => <Heading3 {...props} />,
                h3: ({ ...props }) => <Heading4 {...props} />,
                h4: ({ ...props }) => <Heading5 {...props} />,
                p: ({ ...props }) => <BodyText {...props} />,
              }}
            />
          </PrivacyWrapper>}
        rightSection={rightSection}
        isLanding
      />
    </>
  );
};
