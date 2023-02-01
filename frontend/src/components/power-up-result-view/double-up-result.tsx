import React, { FC } from "react";
import { PowerUpId, UseDoubleUpBackend } from "../../types";
import { getPowerUpData } from "../../util";
import { PowerUpResult } from "./power-up-result";

interface Props {
  data: UseDoubleUpBackend;
  id: PowerUpId;
}

export const DoubleUpResult: FC<Props> = ({ data, id }) => {
  const powerUpData = getPowerUpData(data.powerUpIds);
  return <PowerUpResult id={id} data={powerUpData} />;
};
