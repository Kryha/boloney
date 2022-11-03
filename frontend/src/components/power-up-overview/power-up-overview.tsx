import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer } from "./styles";
import { useViewport } from "../../hooks/use-viewport";
import { PowerUp } from "../../types";
import { PowerUpIcon } from "../icons";
import { PowerUpList } from "./power-up-list";
import { useStore } from "../../store";
import { PowerUpListOverview } from "../power-up-list-overview";

interface PowerUpOverviewProps {
  powerUps?: PowerUp[];
}

export const PowerUpOverview: FC<PowerUpOverviewProps> = ({ powerUps }) => {
  const { height } = useViewport();
  // const isModalVisible = useStore((state) => state.isModalVisible);

  if (!powerUps || !powerUps.length) return <></>;

  // if (isModalVisible) return <PowerUpListOverview powerUps={powerUps} />;

  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer height={height}>
        <PowerUpIcon powerUpAmount={powerUps.length} />
        <PowerUpList powerUps={powerUps} />
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
