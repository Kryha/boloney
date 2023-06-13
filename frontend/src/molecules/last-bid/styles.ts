import styled from "@emotion/styled";

import { BaseColumn } from "../../atoms";
import { LAST_BID_WIDTH, layoutHeight } from "../../design";
import { getSidebarHeight } from "../../util";

interface Props {
  playerColor: string;
  divisors?: number;
}

export const PlayerBidWrapper = styled(BaseColumn)<Props>`
  height: ${({ divisors }): string => (divisors ? `${getSidebarHeight(divisors)}vh` : layoutHeight.xxxl)};
  width: ${LAST_BID_WIDTH};
  background: ${({ playerColor }) => playerColor};
`;
