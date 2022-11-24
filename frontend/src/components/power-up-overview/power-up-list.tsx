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
  const setModalWithoutContainer = useStore((state) => state.setModalWithoutContainer);
  const setModalComponentChildren = useStore((state) => state.setModalComponentChildren);
  const { width } = useViewport();

  const initialPowerUpsShown = width > MEDIUM_VIEWPORT_WIDTH ? POWER_UP_DEFAULT_VIEW : POWER_UP_DEFAULT_VIEW_SMALL;

  const showModal = () => {
    setModalWithoutContainer(true);
    setModalComponentChildren(<PowerUpListOverview powerUpIds={powerUpIds} />);
  };
  return (
    <YourPowerUpContainer>
      {powerUpIds.slice(0, initialPowerUpsShown).map((powerUpId, i) => (
        //! Don't use powerUpId as key since we allow for duplicate power-ups
        <PowerUpComponent key={i} powerUp={getPowerUp(powerUpId)} showPowerUps={showModal} />
      ))}
      {powerUpIds.length > initialPowerUpsShown && (
        <PowerUpWrapper onClick={() => showModal()}>
          <PowerUpOverview>
            <GeneralText>{text.param.powerUpAmount(powerUpIds.length - initialPowerUpsShown)}</GeneralText>
          </PowerUpOverview>
        </PowerUpWrapper>
      )}
    </YourPowerUpContainer>
  );
};
