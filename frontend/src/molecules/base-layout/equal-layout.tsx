import { FC, ReactNode } from "react";

import { BaseLayoutWrapper, EqualMainSection, EqualRightSection, LeftSection } from "./styles";

interface EqualLayoutProps {
  leftSection?: ReactNode;
  mainSection?: ReactNode;
  rightSection?: ReactNode;
  isLanding?: boolean;
  showFooter?: boolean;
}

/**
 *
 * This is the EqualLayout component, its is used throughout the application to form its general layout. The left and right section are equal in size.
 * @param {ReactNode} leftSection - This is component that will appear on the left section of the equal layout.
 * @param {ReactNode} mainSection - This is component that will appear on the middle section of the equal layout.
 * @param {ReactNode} rightSection - This is component that will appear on the right section of the equal layout.
 * @param {boolean} showFooter - If set to false, it hides the footer and when set to true the footer appears.
 * @param {boolean} isLanding - If set to false, it position the top navigation in a fixed position otherwise relative position..
 */

export const EqualLayout: FC<EqualLayoutProps> = ({ leftSection, mainSection, rightSection, isLanding }) => {
  return (
    <BaseLayoutWrapper isLanding={isLanding}>
      <LeftSection>{leftSection}</LeftSection>
      <EqualMainSection>{mainSection}</EqualMainSection>
      <EqualRightSection>{rightSection}</EqualRightSection>
    </BaseLayoutWrapper>
  );
};
