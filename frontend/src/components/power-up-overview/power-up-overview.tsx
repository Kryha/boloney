import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer } from "./styles";
import { useViewport } from "../../hooks/use-viewport";
import { PowerUp } from "../../types";
import { PowerUpIcon } from "../icons";
import { PowerUpList } from "./power-up-list";

interface PowerUpOverviewProps {
  powerUps?: PowerUp[];
}

export const PowerUpOverview: FC<PowerUpOverviewProps> = ({ powerUps }) => {
  const { height } = useViewport();

  if (!powerUps || !powerUps.length) return <></>;

  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer height={height}>
        <PowerUpIcon powerUpAmount={powerUps.length} />
        <PowerUpList powerUps={powerUps} />
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
