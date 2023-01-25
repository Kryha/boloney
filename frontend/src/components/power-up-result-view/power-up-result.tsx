import { FC } from "react";
import { PowerUp, PowerUpId } from "../../types";
import { PowerUpPile } from "../power-up-pile";
import { PowerUpResultText } from "./power-up-result-text";

interface PowerUpResultProps {
  data: PowerUp[];
  id?: PowerUpId;
}

export const PowerUpResult: FC<PowerUpResultProps> = ({ data, id }) => {
  if (!id) return <></>;

  return (
    <>
      <PowerUpResultText id={id} />
      <PowerUpPile data={data} />
    </>
  );
};
