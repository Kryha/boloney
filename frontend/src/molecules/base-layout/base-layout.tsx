import { FC, ReactNode } from "react";
import { Footer } from "../footer";

import { BaseLayoutWrapper, LeftSection, MainSection, RightSection } from "./styles";

interface BaseLayoutProps {
  leftSection?: ReactNode;
  mainSection?: ReactNode;
  rightSection?: ReactNode;
  showFooter?: boolean;
}

/**
 *
 * This is the BaseLayout component, its is used throughout the application to form its general layout. The left section is smaller compared to the right section.
 * @param {ReactNode} leftSection - This is component that will appear on the left section of the base layout.
 * @param {ReactNode} mainSection - This is component that will appear on the middle section of the base layout.
 * @param {ReactNode} rightSection - This is component that will appear on the right section of the base layout.
 * @param {boolean} showFooter - If set to false, it hides the footer and when set to true the footer appears.
 */

export const BaseLayout: FC<BaseLayoutProps> = ({ leftSection, mainSection, rightSection, showFooter = true }) => {
  return (
    <BaseLayoutWrapper>
      <LeftSection>{leftSection}</LeftSection>
      <MainSection>
        {mainSection}
        {showFooter && <Footer />}
      </MainSection>
      <RightSection>{rightSection}</RightSection>
    </BaseLayoutWrapper>
  );
};
