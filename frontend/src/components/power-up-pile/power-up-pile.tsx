import { FC, useEffect, useState } from "react";
import { PowerUp } from "../../types";
import { PowerUpCard } from "../power-up-card";
import { PowerUpSpreadContainer, PowerUpPileContainer, EmptyPowerUpCard } from "./styles";

interface PowerUpPileProps {
  data: PowerUp[];
  selectedPowerUp?: number;
  onClick?: (powerUpIndex?: number) => void;
  disableId?: boolean;
}

export const PowerUpPile: FC<PowerUpPileProps> = ({ data, selectedPowerUp, onClick, disableId }) => {
  const [displayPowerUps, setDisplayPowerUps] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayPowerUps(true);
    }, 1000);
  }, []);

  return (
    <>
      {displayPowerUps ? (
        <PowerUpSpreadContainer>
          {data.map((powerUp, index) => (
            <PowerUpCard
              powerUp={powerUp}
              key={index}
              powerUpIndex={index}
              isSelected={selectedPowerUp === index}
              onClickSelect={onClick}
              disableId={disableId}
            />
          ))}
        </PowerUpSpreadContainer>
      ) : (
        <PowerUpPileContainer>
          <PowerUpCard powerUp={data[0]} />
          <EmptyPowerUpCard />
        </PowerUpPileContainer>
      )}
    </>
  );
};
