import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { text } from "../../assets/text";

import { BaseInput, BaseLayout, Heading1, Heading3, Heading4, Input, Paragraph } from "../../components";
import { PrimaryButton } from "../../components/buttons";
import { TopNavigation } from "../../components/top-navigation";
import { useViewport } from "../../hooks/use-viewport";
import { AuthContainer, EmailInput, InformationContainer, PasswordInput, SignInLink, SignOrJoinContainer } from "./styles";

interface Props {
  // children: ReactNode;
  // text: SellText;
  // data: Data;

  isLoading?: boolean;
  onSubmit: (price: number) => void;
}
interface LoginProps {
  username: string;
  password: string;
}

export const Login: FC = () => {
  const { width } = useViewport();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<LoginProps>({ mode: "onChange", reValidateMode: "onChange" });
  const onSubmit = (username: string, password: string) => {
    console.log(username, password);
  };

  return (
    <BaseLayout
      leftSection={<Heading3>{text.general.logoHere}</Heading3>}
      mainSection={
        <>
          <InformationContainer>
            {/* make it a login form */}
            <Heading1>{text.form.firstThingsFirst}</Heading1>
            <Heading4>{text.form.whoAreYou}</Heading4>
          </InformationContainer>
          <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
            <AuthContainer width={width}>
              <Input label={text.form.username}>
                <EmailInput type="text" defaultValue="" {...register("username", { required: true })} />
              </Input>
              <Input label={text.form.password}>
                <PasswordInput type="password" defaultValue="" {...register("password", { required: true })} />
              </Input>
            </AuthContainer>
            <SignOrJoinContainer>
              <Paragraph>{text.form.iAlreadyHaveAnAccount}</Paragraph>
              <SignInLink>{text.form.signIn}</SignInLink>
              <PrimaryButton type="submit" text={text.form.join} />
            </SignOrJoinContainer>
          </form>
        </>
      }
      rightSection={<TopNavigation />}
    />
  );
};
