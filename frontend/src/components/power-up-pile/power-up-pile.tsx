import { FC, useState } from "react";
import { PowerUp } from "../../types";
import { PowerUpCard } from "../power-up-card";
import { PowerUpSpreadContainer, PowerUpPileContainer, EmptyPowerUpCard } from "./styles";

interface PowerUpPileProps {
  data: PowerUp[];
}

export const PowerUpPile: FC<PowerUpPileProps> = ({ data }) => {
  const [displayPowerUps, setDisplayPowerUps] = useState(false);

  const revealPowerUps = () => {
    setDisplayPowerUps(true);
  };

  return (
    <>
      {displayPowerUps ? (
        <PowerUpSpreadContainer>
          {data.map((powerUp, index) => (
            <PowerUpCard powerUp={powerUp} key={index} />
          ))}
        </PowerUpSpreadContainer>
      ) : (
        <PowerUpPileContainer onClick={() => revealPowerUps()}>
          <PowerUpCard powerUp={data[0]} />
          <EmptyPowerUpCard />
        </PowerUpPileContainer>
      )}
    </>
  );
};
