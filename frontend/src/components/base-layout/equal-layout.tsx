import { FC, ReactNode } from "react";

import { BaseLayoutWrapper, EqualMainSection, EqualRightSection, LeftSection } from "./styles";

interface EqualLayoutProps {
  leftSection?: ReactNode;
  mainSection?: ReactNode;
  rightSection?: ReactNode;
}

export const EqualLayout: FC<EqualLayoutProps> = ({ leftSection, mainSection, rightSection }) => {
  return (
    <BaseLayoutWrapper isLanding>
      <LeftSection>{leftSection}</LeftSection>
      <EqualMainSection>{mainSection}</EqualMainSection>
      <EqualRightSection>{rightSection}</EqualRightSection>
    </BaseLayoutWrapper>
  );
};
