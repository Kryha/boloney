import { FC, useState } from "react";

import { LargePowerUpImage, PowerUpCard, PowerUpImage, PowerUpInfo, PowerUpListOverviewWrapper } from "./styles";
import { PowerUp } from "../../types";
import { PowerUpDataProps, POWER_UP_DATA, text } from "../../assets";
import { GeneralText, Heading1, Heading2 } from "../atoms";
import { color } from "../../design";
import { useStore } from "../../store";

interface PowerUpListOverviewProps {
  powerUps: PowerUp[];
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUps }) => {
  const setIsContainerVisible = useStore((state) => state.setIsContainerVisible);
  const [showOverview, setShowOverview] = useState(true);
  const [power, setPowerUp] = useState<PowerUpDataProps | undefined>(undefined);

  const openDetail = (powerUp: PowerUpDataProps) => {
    setIsContainerVisible(true);
    setShowOverview(false);
    setPowerUp(powerUp);
  };

  return (
    <>
      {showOverview ? (
        <PowerUpListOverviewWrapper showOverview={showOverview}>
          {powerUps.map((powerUp) => {
            const dataPowerUp = POWER_UP_DATA.find((a) => a.id === powerUp.id);
            if (!dataPowerUp) return <></>;

            return (
              <PowerUpCard key={dataPowerUp.id} onClick={() => openDetail(dataPowerUp)}>
                <PowerUpImage src={dataPowerUp.cardImage} />
                <PowerUpInfo>
                  <Heading2 customColor={color.mediumGrey}>{dataPowerUp.name}</Heading2>
                  <GeneralText>{text.param.zeroAmount(dataPowerUp.id)}</GeneralText>
                </PowerUpInfo>
              </PowerUpCard>
            );
          })}
        </PowerUpListOverviewWrapper>
      ) : (
        <>
          {power && (
            <>
              <Heading1 customColor={color.mediumGrey}>{power.name}</Heading1>
              <GeneralText>{power.longDescription}</GeneralText>
              <LargePowerUpImage></LargePowerUpImage>
            </>
          )}
        </>
      )}
    </>
  );
};
