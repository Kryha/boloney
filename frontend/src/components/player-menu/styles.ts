import styled from "@emotion/styled";
import { PlusIcon } from "../../assets/icons";
// import { PlusIcon } from "../../assets/icons";

import { color, margins } from "../../design";
import { Heading3, Heading4 } from "../atoms";

export const PlayerMenuWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 75vw;
`;

export const PlayerMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 25vw;
  background: transparent;
`;

export const MenuSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small1};
  width: 25vw;
  height: 9.375vh;
  background: transparent;
  border-bottom: 1px solid ${color.black};
  border-left: 1px solid ${color.black};
  ${Heading4} {
    font-size: 22px;
  }
`;

export const ChatSection = styled(MenuSection)`
  height: 50px;
  cursor: pointer;
`;

export const HistorySection = styled(MenuSection)`
  border-top: 1px solid ${color.black};
  height: 50px;
  cursor: pointer;
`;

export const Plus = styled(PlusIcon)``;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px ${margins.small2};
  width: 100%;
  align-items: center;
`;
