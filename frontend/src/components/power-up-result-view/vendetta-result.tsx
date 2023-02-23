import { FC } from "react";
import { PowerUpId, UseVendettaBackend } from "../../types";
import { getPowerUpData } from "../../util";
import { PowerUpResult } from "./power-up-result";

interface VendettaResultProps {
  data: UseVendettaBackend;
  id: PowerUpId;
}

export const VendettaResult: FC<VendettaResultProps> = ({ data, id }) => {
  const powerUpData = getPowerUpData(data.targetPowerUps);

  return <PowerUpResult id={id} data={powerUpData} />;
};
