import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer } from "./styles";
import { useViewport } from "../../hooks/use-viewport";
import { PowerUpId } from "../../types";
import { PowerUpIcon } from "../icons";
import { PowerUpList } from "./power-up-list";
import { color } from "../../design";

interface PowerUpOverviewProps {
  powerUpIds?: PowerUpId[];
  isInHud?: boolean;
}

export const PowerUpOverview: FC<PowerUpOverviewProps> = ({ powerUpIds, isInHud }) => {
  const { height } = useViewport();

  if (!powerUpIds || !powerUpIds.length) return <></>;

  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer height={height}>
        <PowerUpIcon powerUpAmount={powerUpIds.length} strokeColor={color.black} />
        <PowerUpList powerUpIds={powerUpIds} isInHud={isInHud} />
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
