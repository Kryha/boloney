import { FC, useEffect, useState } from "react";

import { EqualLayout, LeftLandingSideBar, RightLandingSideBar } from "../../components";
import { useStore } from "../../store";
import { useIsMobile } from "../../hooks";
import { FooterComponent } from "../../components/footer-component";
import { MdComponent } from "./md-component";

interface MdPageProps {
  mdMetaData: string;
}

export const MdPage: FC<MdPageProps> = ({ mdMetaData }) => {
  const isSidebarVisible = useStore((state) => state.isSidebarVisible);
  const isMobile = useIsMobile();
  const [text, setText] = useState("");
  const leftSection = isMobile || <LeftLandingSideBar isSidebarVisible={isSidebarVisible} />;
  const rightSection = isMobile || <RightLandingSideBar isSidebarVisible={isSidebarVisible} />;

  useEffect(() => {
    fetch(mdMetaData)
      .then((response) => {
        return response.text();
      })
      .then((text) => setText(text));
  }, [mdMetaData]);

  return (
    <>
      <EqualLayout leftSection={leftSection} mainSection={<MdComponent text={text} />} rightSection={rightSection} isLanding />
      <FooterComponent />
    </>
  );
};
