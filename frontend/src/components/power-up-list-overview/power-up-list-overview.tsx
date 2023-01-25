import { FC } from "react";

import {
  ButtonWrapper,
  DescriptionText,
  PowerUpCard,
  PowerUpContainer,
  PowerUpImage,
  PowerUpInfoContainer,
  PowerUpInfoWrapper,
  PowerUpListOverviewWrapper,
} from "./styles";
import { PowerUp, PowerUpId } from "../../types";
import { text } from "../../assets";
import { GeneralText, Heading2 } from "../atoms";
import { color } from "../../design";
import { PrimaryButton } from "../buttons";
import { getPowerUpData } from "../../util";
import { useViewport } from "../../hooks";
import { useStore } from "../../store";

interface PowerUpListItemProps {
  powerUp: PowerUp;
  onClick?: (powerUp: PowerUp) => void;
}

const PowerUpListItem: FC<PowerUpListItemProps> = ({ powerUp, onClick }) => {
  const { width } = useViewport();

  return (
    <PowerUpContainer width={width} isPowerUpInUse={!!onClick}>
      <PowerUpCard>
        <PowerUpImage src={powerUp.cardImage} isImageLarge={powerUp.isImageLarge} />
        <PowerUpInfoWrapper>
          <PowerUpInfoContainer>
            <Heading2 customColor={color.mediumGrey}>{powerUp.name}</Heading2>
            <DescriptionText>{powerUp.longDescription}</DescriptionText>
            <GeneralText>{text.param.zeroAmount(powerUp.id)}</GeneralText>
          </PowerUpInfoContainer>
        </PowerUpInfoWrapper>
      </PowerUpCard>
      {!!onClick && (
        <ButtonWrapper>
          <PrimaryButton text={text.powerUps.boost} onClick={() => onClick(powerUp)} />
        </ButtonWrapper>
      )}
    </PowerUpContainer>
  );
};

interface PowerUpListProps {
  powerUps: PowerUp[];
  onClick?: (powerUp: PowerUp) => void;
}

const PowerUpList: FC<PowerUpListProps> = ({ powerUps, onClick }) => {
  return (
    <PowerUpListOverviewWrapper powerUpsAmount={powerUps.length}>
      {powerUps.map((powerUp, i) => (
        <PowerUpListItem key={i} powerUp={powerUp} onClick={onClick} />
      ))}
    </PowerUpListOverviewWrapper>
  );
};

interface Props {
  powerUpIds: PowerUpId[];
}

export const PowerUpListOverview: FC<Props> = ({ powerUpIds }) => {
  const powerUps = getPowerUpData(powerUpIds);

  return <PowerUpList powerUps={powerUps} />;
};

export const PowerUpListUse: FC<Props> = ({ powerUpIds }) => {
  const hideModal = useStore((state) => state.hideModal);
  const setPowerUpState = useStore((state) => state.setPowerUpState);

  const powerUps = getPowerUpData(powerUpIds);

  const handleClick = (powerUp: PowerUp) => {
    setPowerUpState({ active: powerUp });
    hideModal();
  };

  return <PowerUpList powerUps={powerUps} onClick={handleClick} />;
};
