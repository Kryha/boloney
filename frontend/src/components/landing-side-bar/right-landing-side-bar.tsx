import { FC } from "react";
import { TopNavigation } from "../top-navigation";
import { LandingHands } from "./landing-hands";
import { LandingSideBarProps } from "./left-landing-side-bar";
import { ColumnGroup, LandingSideBarWrapper, SidebarContainer, SidebarWrapper } from "./styles";

export const RightLandingSideBar: FC<LandingSideBarProps> = ({ isSidebarVisible }) => {
  return (
    <LandingSideBarWrapper>
      <TopNavigation location="landing" />
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
