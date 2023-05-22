import { FC } from "react";
import { spacing } from "../../design";
import { PowerUp } from "../../types";
import { PowerUpCard } from "../power-up/power-up";
import { PowerUpSpreadContainer, PowerUpPileContainer, EmptyPowerUpCard } from "./styles";

interface PowerUpPileProps {
  powerUps: PowerUp[];
  isPowerUpsDisplayed?: boolean;
  selectedPowerUp?: number;
  onClick?: (powerUpIndex?: number) => void;
  isPowerUpDisabled?: boolean;
}

export const PowerUpPile: FC<PowerUpPileProps> = ({ powerUps, isPowerUpsDisplayed, onClick, isPowerUpDisabled }) => {
  return (
    <>
      {isPowerUpsDisplayed ? (
        <PowerUpSpreadContainer gap={spacing.s}>
          {powerUps.map((powerUp, index) => (
            <PowerUpCard powerUp={powerUp} key={index} powerUpKey={index} onClickRadio={onClick} isPowerUpDisabled={isPowerUpDisabled} />
          ))}
        </PowerUpSpreadContainer>
      ) : (
        <PowerUpPileContainer alignItems="flex-end" gap={spacing.sm}>
          <PowerUpCard powerUp={powerUps[0]} powerUpKey={0} />
          <EmptyPowerUpCard />
        </PowerUpPileContainer>
      )}
    </>
  );
};
