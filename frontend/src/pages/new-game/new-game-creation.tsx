import { FC } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import { FormContainer, Heading1, Heading4, PageTitle } from "../../components";
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
          <PlayersDiceContainer></PlayersDiceContainer>
          <PowerupsAmountContainer></PowerupsAmountContainer>
          <PowerupsPickContainer></PowerupsPickContainer>
          <ToggleContainer></ToggleContainer>
          <ToggleContainer></ToggleContainer>
          <BottomContainer></BottomContainer>
        </FormContainer>
      </form>
    </NewGameContainer>
  );
};
