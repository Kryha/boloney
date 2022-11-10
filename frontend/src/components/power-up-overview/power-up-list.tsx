import { FC } from "react";
import { text } from "../../assets";
import { MEDIUM_VIEWPORT_WIDTH, POWER_UP_DEFAULT_VIEW, POWER_UP_DEFAULT_VIEW_SMALL } from "../../constants";
import { useViewport } from "../../hooks";
import { useStore } from "../../store";
import { PowerUpId } from "../../types";
import { getPowerUp } from "../../util";
import { GeneralText } from "../atoms/text";
import { PowerUpComponent } from "../power-up";
import { PowerUpListOverview } from "../power-up-list-overview";
import { PowerUpWrapper } from "../power-up/styles";
import { PowerUpOverview, YourPowerUpContainer } from "./styles";

interface PowerUpListProps {
  powerUpIds: PowerUpId[];
}

export const PowerUpList: FC<PowerUpListProps> = ({ powerUpIds }) => {
  const toggleModalWithoutContainer = useStore((state) => state.toggleModalWithoutContainer);
  const setModalComponentChildren = useStore((state) => state.setModalComponentChildren);
  const { width } = useViewport();

  const initialPowerUpsShown = width > MEDIUM_VIEWPORT_WIDTH ? POWER_UP_DEFAULT_VIEW : POWER_UP_DEFAULT_VIEW_SMALL;

  const toggleShowModal = () => {
    toggleModalWithoutContainer();
    setModalComponentChildren(<PowerUpListOverview powerUpIds={powerUpIds} />);
  };
  return (
    <YourPowerUpContainer>
      {powerUpIds.slice(0, initialPowerUpsShown).map((powerUpId) => (
        <PowerUpComponent key={powerUpId} powerUp={getPowerUp(powerUpId)} showPowerUps={toggleShowModal} />
      ))}
      {powerUpIds.length > initialPowerUpsShown && (
        <PowerUpWrapper onClick={() => toggleShowModal()}>
          <PowerUpOverview>
            <GeneralText>{text.param.powerUpAmount(powerUpIds.length - initialPowerUpsShown)}</GeneralText>
          </PowerUpOverview>
        </PowerUpWrapper>
      )}
    </YourPowerUpContainer>
  );
};
