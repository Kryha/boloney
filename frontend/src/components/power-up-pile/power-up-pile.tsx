import { FC, useEffect, useState } from "react";
import { PowerUp } from "../../types";
import { PowerUpCard } from "../power-up-card";
import { PowerUpSpreadContainer, PowerUpPileContainer, EmptyPowerUpCard } from "./styles";

interface PowerUpPileProps {
  data: PowerUp[];
}

export const PowerUpPile: FC<PowerUpPileProps> = ({ data }) => {
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
            <PowerUpCard powerUp={powerUp} key={index} />
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
