import { FC, useState } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { PowerUp, PowerUpId } from "../../types";
import { Heading2 } from "../atoms";
import { Checkbox } from "../checkbox";
import {
  CheckboxArea,
  DescriptionText,
  PowerUpCardWrapperCheckbox,
  PowerUpImageSmall,
  PowerUpInfoContainerCheckbox,
  SeeDetailsText,
} from "./styles";

interface PowerUpCardCheckboxProps {
  powerUpKey: number;
  powerUp: PowerUp;
  toggleCheckBox: (key: number, powerUpId: PowerUpId) => void;
  isClicked: boolean;
  disabledCheckbox?: boolean;
}

export const PowerUpCardCheckbox: FC<PowerUpCardCheckboxProps> = ({
  powerUpKey,
  powerUp,
  toggleCheckBox,
  isClicked,
  disabledCheckbox = false,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleDescriptionClick = () => {
    setIsDescriptionVisible((isDescriptionVisible) => !isDescriptionVisible);
  };

  const onClick = () => {
    toggleCheckBox(powerUpKey, powerUp.id);
  };

  return (
    <PowerUpCardWrapperCheckbox>
      <PowerUpImageSmall src={powerUp.cardImage} />
      <PowerUpInfoContainerCheckbox>
        <Heading2 customColor={color.mediumGrey}>{powerUp.name}</Heading2>
        {isDescriptionVisible ? (
          <DescriptionText onClick={handleDescriptionClick}>{powerUp.longDescription}</DescriptionText>
        ) : (
          <SeeDetailsText onClick={handleDescriptionClick}>{text.powerUps.seeDetails}</SeeDetailsText>
        )}
      </PowerUpInfoContainerCheckbox>
      <CheckboxArea>{disabledCheckbox && !isClicked ? <></> : <Checkbox isChecked={isClicked} toggleCheck={onClick} />}</CheckboxArea>
    </PowerUpCardWrapperCheckbox>
  );
};
