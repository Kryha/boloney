import { FC } from "react";

import { PowerUpCard, PowerUpImage, PowerUpInfoContainer, PowerUpInfoWrapper, PowerUpListOverviewWrapper } from "./styles";
import { PowerUpId } from "../../types";
import { text } from "../../assets";
import { GeneralText, Heading2 } from "../atoms";
import { color } from "../../design";
import { Link, PrimaryButton } from "../buttons";
import { getPowerUpData } from "../../util";
import { ErrorView } from "../error-view";

interface PowerUpListOverviewProps {
  powerUpIds: PowerUpId[];
  isPowerUpInUse?: boolean;
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUpIds, isPowerUpInUse }) => {
  const dataPowerUp = getPowerUpData(powerUpIds);

  if (!dataPowerUp) return <ErrorView />;

  return (
    <PowerUpListOverviewWrapper powerUpsAmount={powerUpIds.length}>
      {dataPowerUp.map((powerUp, i) => {
        return (
          <PowerUpCard key={i}>
            <PowerUpImage src={powerUp.cardImage} />
            <PowerUpInfoWrapper>
              <PowerUpInfoContainer>
                <Heading2 customColor={color.mediumGrey}>{powerUp.name}</Heading2>
                <Link text={text.powerUps.seeDetails} />
                <GeneralText>{text.param.zeroAmount(powerUp.id)}</GeneralText>
              </PowerUpInfoContainer>
              {isPowerUpInUse && <PrimaryButton text={text.powerUps.boostIt} />}
            </PowerUpInfoWrapper>
          </PowerUpCard>
        );
      })}
    </PowerUpListOverviewWrapper>
  );
};
