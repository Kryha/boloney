import { FC } from "react";
import { GeneralNavigationBar } from "../../organisms";
import { LandingHands } from "./landing-hands";
import { SidebarProps } from "./left-landing-side-bar";
import { ColumnGroup, LandingSideBarWrapper, SidebarContainer, SidebarWrapper } from "./styles";

export const RightLandingSideBar: FC<SidebarProps> = ({ isSidebarVisible }) => {
  return (
    <LandingSideBarWrapper>
      <GeneralNavigationBar />
      <SidebarWrapper isSidebarVisible={isSidebarVisible}>
        <SidebarContainer>
          <ColumnGroup isDice={false}>
            <LandingHands />
          </ColumnGroup>
        </SidebarContainer>
      </SidebarWrapper>
    </LandingSideBarWrapper>
  );
};
