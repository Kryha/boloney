// TODO: delete file

import styled from "@emotion/styled";
import { Card, BaseColumn, BaseRow, HUDBlock } from "../../atoms";
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
