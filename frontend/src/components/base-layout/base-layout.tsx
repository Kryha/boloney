import { FC, ReactNode } from "react";

import { BaseLayoutWrapper, LeftSection, MainSection, RightSection } from "./styles";

interface BaseLayoutProps {
  leftSection?: ReactNode;
  mainSection?: ReactNode;
  rightSection?: ReactNode;
}

export const BaseLayout: FC<BaseLayoutProps> = ({ leftSection, mainSection, rightSection }) => {
  return (
    <BaseLayoutWrapper>
      <LeftSection>{leftSection}</LeftSection>
      <MainSection>{mainSection}</MainSection>
      <RightSection>{rightSection}</RightSection>
    </BaseLayoutWrapper>
  );
};
