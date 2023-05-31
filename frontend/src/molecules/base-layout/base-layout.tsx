import { FC, ReactNode } from "react";
import { AlignContent } from "../../atoms";
import { Footer } from "../footer";

import { BaseLayoutWrapper, LeftSection, MainSection, RightSection } from "./styles";

interface BaseLayoutProps {
  leftSection?: ReactNode;
  mainSection?: ReactNode;
  rightSection?: ReactNode;
  showFooter?: boolean;
  justifyContent?: AlignContent;
}

/**
 *
 * This is the BaseLayout component, it is used throughout the application to form its general layout. The left section is smaller compared to the right section.
 * @param {ReactNode} leftSection - This is component that will appear on the left section of the base layout.
 * @param {ReactNode} mainSection - This is component that will appear on the middle section of the base layout.
 * @param {ReactNode} rightSection - This is component that will appear on the right section of the base layout.
 * @param {boolean} showFooter - If set to false, it hides the footer and when set to true the footer appears.
 * @param {AlignContent} justifyContent - This is the alignment of the main section.
 */

export const BaseLayout: FC<BaseLayoutProps> = ({ leftSection, mainSection, rightSection, showFooter = true, justifyContent }) => {
  return (
    <BaseLayoutWrapper>
      <LeftSection>{leftSection}</LeftSection>
      <MainSection justifyContent={justifyContent}>
        {mainSection}
        {showFooter && <Footer />}
      </MainSection>
      <RightSection>{rightSection}</RightSection>
    </BaseLayoutWrapper>
  );
};
