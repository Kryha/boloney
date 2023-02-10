import { FC } from "react";
import { ColumnGroup, LandingSideBarWrapper, SidebarWrapper } from "./styles";
import { FloatingDice } from "./floating-dice";
import { landingDice } from "../../assets";

export interface LandingSideBarProps {
  isSidebarVisible: boolean;
}

export const LeftLandingSideBar: FC<LandingSideBarProps> = ({ isSidebarVisible }) => {
  return (
    <LandingSideBarWrapper>
      <SidebarWrapper isSidebarVisible={isSidebarVisible}>
        <ColumnGroup isDice>
          {landingDice.map((dice, index) => (
            <FloatingDice key={index} speed={dice.speed} customColor={dice.color} />
          ))}
        </ColumnGroup>
      </SidebarWrapper>
    </LandingSideBarWrapper>
  );
};
