import { FC } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import { BaseInput, FormContainer, Heading1, Heading4, Input, PageTitle, Paragraph, PrimaryButton } from "../../components";
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
              <BaseInput />
            </Input>
            <Input label={text.newGame.dicePerPlayer}>
              <BaseInput />
            </Input>
          </PlayersDiceContainer>

          <PowerupsAmountContainer>
            <Input label={text.newGame.powerupsPerPlayer}>
              <BaseInput />
            </Input>
          </PowerupsAmountContainer>

          <PowerupsPickContainer>
            <Input label={text.newGame.whichPowerups}>
              <BaseInput />
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
