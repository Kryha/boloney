import { FC, useState } from "react";
import { PrimaryButton } from "../../components";
import { AttributesContainer } from "./styles";

interface Props {
  onRoll: (notation: string, group: string) => void;
}

export const Attributes: FC<Props> = ({ onRoll }) => {
  const [isRolled, setIsRolled] = useState(false);
  const rollDice = () => {
    onRoll("10d6", "");
    setIsRolled(true);
  };

  return <AttributesContainer>{<PrimaryButton onClick={() => rollDice()} text="roll it" />}</AttributesContainer>;
};

export default Attributes;
