import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import {
  BaseOption,
  BaseSelect,
  Checkbox,
  FormContainer,
  Heading1,
  Heading4,
  Input,
  PageTitle,
  Paragraph,
  PrimaryButton,
} from "../../components";
import {
  MAX_DICE_PER_PLAYER,
  MAX_PLAYERS,
  MAX_POWERUPS_PER_PLAYER,
  MIN_DICE_PER_PLAYER,
  MIN_PLAYERS,
  MIN_POWERUPS_PER_PLAYER,
} from "../../constants";
import { PowerupType } from "../../interfaces";
import { range } from "../../util";
import { BottomContainer, FieldContainer, NewGameContainer, PlayersDiceContainer } from "./styles";

interface Props {
  setUrl: (url: string) => void;
}

interface Fields {
  players: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isPrivate: boolean;
  isUsingFakeCredits: boolean;
}

export const NewGameCreation: FC<Props> = ({ setUrl }) => {
  const { register, handleSubmit } = useForm<Fields>({ mode: "onChange", reValidateMode: "onChange" });

  const [availablePowerups, setAvailablePowerups] = useState<PowerupType[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isUsingFakeCredits, setIsUsingFakeCredits] = useState(false);

  const togglePowerup = (powerup: PowerupType) => {
    const powerupsSet = new Set(availablePowerups);
    const itemFound = powerupsSet.delete(powerup);
    if (!itemFound) powerupsSet.add(powerup);

    setAvailablePowerups(Array.from(powerupsSet));
  };

  const handleFormSubmit = handleSubmit((data) => {
    data.players = Number(data.players);
    data.dicePerPlayer = Number(data.dicePerPlayer);
    data.powerupsPerPlayer = Number(data.powerupsPerPlayer);
    data.availablePowerups = availablePowerups;
    data.isPrivate = isPrivate;
    data.isUsingFakeCredits = isUsingFakeCredits;
    // TODO: call backend
    console.log("SUBMITTING:", data);
    // TODO: retrieve url from backend
    setUrl("tmp/url");
  });

  return (
    <NewGameContainer>
      <PageTitle>
        <Heading1>{text.newGame.newGame}</Heading1>
        <Heading4>{text.newGame.newGameDescription}</Heading4>
      </PageTitle>
      <form onSubmit={handleFormSubmit}>
        <FormContainer>
          <PlayersDiceContainer>
            <Input label={text.newGame.players}>
              <BaseSelect {...register("players")}>
                {range(MAX_PLAYERS, MIN_PLAYERS).map((n) => (
                  <BaseOption key={n} value={n}>
                    {text.param.players(n)}
                  </BaseOption>
                ))}
              </BaseSelect>
            </Input>
            <Input label={text.newGame.dicePerPlayer}>
              <BaseSelect {...register("dicePerPlayer")}>
                {range(MAX_DICE_PER_PLAYER, MIN_DICE_PER_PLAYER).map((n) => (
                  <BaseOption key={n} value={n}>
                    {text.param.dice(n)}
                  </BaseOption>
                ))}
              </BaseSelect>
            </Input>
          </PlayersDiceContainer>

          <FieldContainer>
            <Input label={text.newGame.powerupsPerPlayer}>
              <BaseSelect {...register("powerupsPerPlayer")}>
                {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
                  <BaseOption key={n} value={n}>
                    {text.param.powerups(n)}
                  </BaseOption>
                ))}
              </BaseSelect>
            </Input>
          </FieldContainer>

          <FieldContainer>
            <Input label={text.newGame.whichPowerups}>
              <Checkbox
                title={text.newGame.powerup1}
                description={text.newGame.powerup1Desc}
                isChecked={availablePowerups.includes("p1")}
                toggleCheck={() => togglePowerup("p1")}
              />
              <Checkbox
                title={text.newGame.powerup2}
                description={text.newGame.powerup2Desc}
                isChecked={availablePowerups.includes("p2")}
                toggleCheck={() => togglePowerup("p2")}
              />
              <Checkbox
                title={text.newGame.powerup3}
                description={text.newGame.powerup3Desc}
                isChecked={availablePowerups.includes("p3")}
                toggleCheck={() => togglePowerup("p3")}
              />
              <Checkbox
                title={text.newGame.powerup4}
                description={text.newGame.powerup4Desc}
                isChecked={availablePowerups.includes("p4")}
                toggleCheck={() => togglePowerup("p4")}
              />
            </Input>
          </FieldContainer>

          <FieldContainer>
            <Input label={text.newGame.privateOrPublic}>
              <Checkbox
                title={text.newGame.private}
                description={text.newGame.privateOrPublicDesc}
                isUsingSwitchIcon
                isChecked={isPrivate}
                toggleCheck={() => setIsPrivate(!isPrivate)}
              />
            </Input>
          </FieldContainer>

          <FieldContainer>
            <Input label={text.newGame.typeOfBet}>
              <Checkbox
                title={text.newGame.fakeCredits}
                description={text.newGame.typeOfBetDesc}
                isUsingSwitchIcon
                isChecked={isUsingFakeCredits}
                toggleCheck={() => setIsUsingFakeCredits(!isUsingFakeCredits)}
              />
            </Input>
          </FieldContainer>

          <BottomContainer>
            <Paragraph>{text.newGame.bottomDesc}</Paragraph>
            <PrimaryButton type="submit" text={text.newGame.continue} />
          </BottomContainer>
        </FormContainer>
      </form>
    </NewGameContainer>
  );
};
