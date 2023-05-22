// TODO: delete file

import styled from "@emotion/styled";
import { Card, BaseColumn, BaseRow, HUDBlock, PlayerInformationBlock, FluidImage } from "../../atoms";
import { spacing, color } from "../../design";

export const PowerUpCard = styled(Card)`
  padding: ${spacing.s};
`;

export const AlignColumn = styled(BaseColumn)`
  height: 100%;
`;

export const BackgroundRow = styled(BaseRow)`
  background: ${color.cloudWhite};
  width: 69.4vw;
`;
export const HalfColumn = styled(BaseColumn)`
  width: 50%;
`;

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: ${color.cloudWhite};
`;

export const BottomHud = styled(HUDBlock)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const PlayerMenuOne = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const PlayerMenuTwo = styled.div`
  position: absolute;
  bottom: 0;
  right: 30vw;
`;

export const MainContainer = styled.div`
  position: absolute;
  overflow-y: scroll;
  left: 12.5vw;
  position: absolute;
  top: 0;
  width: 62.5vw;
  height: 89vh;
`;

export const HubInfoBlock = styled(PlayerInformationBlock)`
  position: absolute;
  top: 0;
  left: 12.5vw;
`;

export const MatchHeadingColumn = styled(BaseColumn)`
  margin-left: ${spacing.xxl};
  margin-top: ${spacing.xxl};
`;
