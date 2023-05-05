import { FC, ReactNode } from "react";
import { FooterComponent } from "../footer-component";

import { BaseLayoutWrapper, LeftSection, MainSection, RightSection } from "./styles";

interface BaseLayoutProps {
  leftSection?: ReactNode;
  mainSection?: ReactNode;
  rightSection?: ReactNode;
  showFooter?: boolean;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ leftSection, mainSection, rightSection, showFooter = true }) => {
  return (
    <BaseLayoutWrapper>
      <LeftSection>{leftSection}</LeftSection>
      <MainSection>
        {mainSection}
        {showFooter && <FooterComponent />}
      </MainSection>
      <RightSection>{rightSection}</RightSection>
    </BaseLayoutWrapper>
  );
};
