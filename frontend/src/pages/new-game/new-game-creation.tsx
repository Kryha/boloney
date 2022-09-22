import { FC } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import {
  BaseInput,
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
import { range } from "../../util";
import {
  BottomContainer,
  NewGameContainer,
  PlayersDiceContainer,
  PowerupsAmountContainer,
  PowerupsPickContainer,
  ToggleContainer,
} from "./styles";

interface Props {
  setUrl: (url: string) => void;
}

interface Fields {
  players: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: []; // TODO: make union type for powerups and make this an array or set of that union type
  isPrivate: boolean;
  isUsingFakeCredits: boolean;
}

export const NewGameCreation: FC<Props> = ({ setUrl }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({ mode: "onChange", reValidateMode: "onChange" });

  const handleFormSubmit = handleSubmit((data) => {
    // TODO: implement logic
    console.log("SUBMITTING:", data);
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

          <PowerupsAmountContainer>
            <Input label={text.newGame.powerupsPerPlayer}>
              <BaseSelect {...register("powerupsPerPlayer")}>
                {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
                  <BaseOption key={n} value={n}>
                    {text.param.powerups(n)}
                  </BaseOption>
                ))}
              </BaseSelect>
            </Input>
          </PowerupsAmountContainer>

          <PowerupsPickContainer>
            <Input label={text.newGame.whichPowerups}>
              <Checkbox title={text.newGame.powerup1} description={text.newGame.powerup1Desc} isChecked={true} />
              <Checkbox title={text.newGame.powerup2} description={text.newGame.powerup2Desc} isChecked={true} />
              <Checkbox title={text.newGame.powerup3} description={text.newGame.powerup3Desc} isChecked={true} />
              <Checkbox title={text.newGame.powerup4} description={text.newGame.powerup4Desc} isChecked={true} />
            </Input>
          </PowerupsPickContainer>

          <ToggleContainer>
            <Input label={text.newGame.privateOrPublic}>
              <BaseInput />
            </Input>
          </ToggleContainer>
          <ToggleContainer>
            <Input label={text.newGame.typeOfBet}>
              <BaseInput />
            </Input>
          </ToggleContainer>

          <BottomContainer>
            <Paragraph>{text.newGame.bottomDesc}</Paragraph>
            <PrimaryButton type="submit" text={text.newGame.continue} />
          </BottomContainer>
        </FormContainer>
      </form>
    </NewGameContainer>
  );
};
