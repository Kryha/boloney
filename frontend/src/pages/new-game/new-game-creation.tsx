import { FC } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import {
  BaseOption,
  BaseSelect,
  FormContainer,
  Heading1,
  Heading4,
  Input,
  PageTitleWrapper,
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
import { FakeCreditsField } from "./fake-credits-field";
import { useNewGameState } from "./new-game-state";
import { PowerupsField } from "./powerups-field";
import { PrivatePublicField } from "./private-public-field";
import { BottomContainer, ButtonContainer, FieldContainer, NewGameContainer, PlayersDiceContainer } from "./styles";

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
  const availablePowerups = useNewGameState((state) => state.availablePowerups);
  const isPrivate = useNewGameState((state) => state.isPrivate);
  const isUsingFakeCredits = useNewGameState((state) => state.isUsingFakeCredits);

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
      <PageTitleWrapper>
        <Heading1>{text.newGame.newGame}</Heading1>
        <Heading4>{text.newGame.newGameDescription}</Heading4>
      </PageTitleWrapper>
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

          <PowerupsField />

          <PrivatePublicField />

          <FakeCreditsField />

          <BottomContainer>
            <Paragraph>{text.newGame.bottomDesc}</Paragraph>
          </BottomContainer>
          <ButtonContainer>
            <PrimaryButton type="submit" text={text.newGame.continue} />
          </ButtonContainer>
        </FormContainer>
      </form>
    </NewGameContainer>
  );
};
