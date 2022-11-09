import { FC, useState } from "react";

import {
  LargePowerUpImage,
  PowerUpButtonContainer,
  PowerUpCard,
  PowerUpDescriptionContainer,
  PowerUpDetailInfo,
  PowerUpDetailSection,
  PowerUpImage,
  PowerUpInfo,
  PowerUpListOverviewWrapper,
} from "./styles";
import { PowerUp } from "../../types";
import { PowerUpDataProps, POWER_UP_DATA, text } from "../../assets";
import { GeneralText, Heading1, Heading2 } from "../atoms";
import { color } from "../../design";
import { useStore } from "../../store";
import { GoBackButton, Link, PrimaryButton } from "../buttons";

interface PowerUpListOverviewProps {
  powerUps: PowerUp[];
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUps }) => {
  const setIsContainerVisible = useStore((state) => state.setIsContainerVisible);
  const setModalComponent = useStore((state) => state.setModalComponent);
  const setIsOverviewVisible = useStore((state) => state.setIsOverviewVisible);
  const isOverviewVisible = useStore((state) => state.isOverviewVisible);
  const [power, setPowerUp] = useState<PowerUpDataProps | undefined>(undefined);
  const [hover, setHover] = useState(false);
  const [id, setId] = useState("");

  const openDetail = (powerUp: PowerUpDataProps) => {
    setIsContainerVisible(true);
    setIsOverviewVisible(false);
    setPowerUp(powerUp);
  };

  const openOverview = () => {
    setIsContainerVisible(false);
    setIsOverviewVisible(true);
    setModalComponent(<PowerUpListOverview powerUps={powerUps} />);
  };

  return (
    <>
      {isOverviewVisible ? (
        <PowerUpListOverviewWrapper showOverview={isOverviewVisible}>
          {powerUps.map((powerUp) => {
            const dataPowerUp = POWER_UP_DATA.find((a) => a.id === powerUp.id);
            if (!dataPowerUp) return <></>;

            return (
              <PowerUpCard
                key={dataPowerUp.id}
                onClick={() => openDetail(dataPowerUp)}
                onMouseOver={() => {
                  setHover(true);
                  setId(dataPowerUp.id);
                }}
                onMouseOut={() => {
                  setHover(false);
                  setId(dataPowerUp.id);
                }}
              >
                <PowerUpImage src={dataPowerUp.cardImage} />
                <PowerUpInfo isHovered={hover && id === dataPowerUp.id}>
                  <Heading2 customColor={color.mediumGrey}>{dataPowerUp.name}</Heading2>
                  {hover && id === dataPowerUp.id ? (
                    <>
                      <Link text={text.powerUps.seeDetails} />
                    </>
                  ) : (
                    <GeneralText>{text.param.zeroAmount(dataPowerUp.id)}</GeneralText>
                  )}
                </PowerUpInfo>
                {hover && id === dataPowerUp.id && <PrimaryButton text={text.powerUps.boostIt} />}
              </PowerUpCard>
            );
          })}
        </PowerUpListOverviewWrapper>
      ) : (
        <>
          {power && (
            <PowerUpDetailSection>
              <Heading1 customColor={color.mediumGrey}>{power.name}</Heading1>
              <PowerUpDetailInfo>
                <PowerUpDescriptionContainer>
                  <GeneralText>{power.longDescription}</GeneralText>
                  <PowerUpButtonContainer>
                    {/* TODO: add button primary */}
                    <GoBackButton text={text.general.goBack} onClick={openOverview} />
                  </PowerUpButtonContainer>
                </PowerUpDescriptionContainer>
                <LargePowerUpImage src={power.cardImage} alt={power.name} />
              </PowerUpDetailInfo>
            </PowerUpDetailSection>
          )}
        </>
      )}
    </>
  );
};
