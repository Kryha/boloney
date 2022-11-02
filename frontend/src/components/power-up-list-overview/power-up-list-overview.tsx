import { FC, useState } from "react";

import { PowerUpCardImage, PowerUpListOverviewWrapper } from "./styles";
import { PowerUp } from "../../types";
import { useStore } from "../../store";
import { Modal } from "../modal";

interface PowerUpListOverviewProps {
  powerUps: PowerUp[];
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUps }) => {
  const setIsModalVisible = useStore((state) => state.setIsModalVisible);

  return (
    <Modal hasCloseButton>
      <PowerUpListOverviewWrapper onClick={() => setIsModalVisible(true)}></PowerUpListOverviewWrapper>
    </Modal>
  );
};
