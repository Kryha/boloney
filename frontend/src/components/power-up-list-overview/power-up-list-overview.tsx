import { FC, useState } from "react";

import { PowerUpCard, PowerUpImage, PowerUpInfo, PowerUpListOverviewWrapper } from "./styles";
import { PowerUp } from "../../types";
import { POWER_UP_DATA, text } from "../../assets";
import { GeneralText, Heading2 } from "../atoms";
import { color } from "../../design";
import { useStore } from "../../store";
import { GoBackButton, Link, PrimaryButton } from "../buttons";

interface PowerUpListOverviewProps {
  powerUps: PowerUp[];
  isPowerUpInUse?: boolean;
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUps, isPowerUpInUse }) => {
  const isOverviewVisible = useStore((state) => state.isOverviewVisible);
  const [hover, setHover] = useState(false);
  const [id, setId] = useState("");

  return (
    <PowerUpListOverviewWrapper showOverview={isOverviewVisible}>
      {powerUps.map((powerUp) => {
        const dataPowerUp = POWER_UP_DATA.find((a) => a.id === powerUp.id);
        if (!dataPowerUp) return <></>;

        return (
          <PowerUpCard
            key={dataPowerUp.id}
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
            {hover && id === dataPowerUp.id && isPowerUpInUse && <PrimaryButton text={text.powerUps.boostIt} />}
          </PowerUpCard>
        );
      })}
    </PowerUpListOverviewWrapper>
  );
};
