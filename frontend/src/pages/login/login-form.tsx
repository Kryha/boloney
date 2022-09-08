import { FC } from "react";
import { useForm } from "react-hook-form";
import { text } from "../../assets/text";

import { Heading1, Heading4, Input, Paragraph, BaseInput } from "../../components";
import { PrimaryButton } from "../../components/buttons";
import { useViewport } from "../../hooks/use-viewport";
import { AuthContainer, InformationContainer, LoginFormContainer, SignInLink, SignOrJoinContainer } from "./styles";

interface LoginProps {
  username: string;
  password: string;
}

export const LoginForm: FC = () => {
  const { width } = useViewport();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<LoginProps>({ mode: "onChange", reValidateMode: "onChange" });

  const onSubmit = (username: string, password: string) => {
    // TODO: integrate
    console.log(username, password);
  };

  return (
    <LoginFormContainer>
      <InformationContainer>
        <Heading1>{text.form.firstThingsFirst}</Heading1>
        <Heading4>{text.form.whoAreYou}</Heading4>
      </InformationContainer>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <AuthContainer width={width}>
          <Input label={text.form.username} error={errors.username && errors.username.type === "required"}>
            <BaseInput type="text" defaultValue="" {...register("username", { required: true })} />
          </Input>
          {/* TODO: add validation */}
          <Input label={text.form.password}>
            <BaseInput type="password" defaultValue="" {...register("password", { required: true })} />
          </Input>
        </AuthContainer>
        <SignOrJoinContainer>
          <Paragraph>{text.form.iAlreadyHaveAnAccount}</Paragraph>
          <SignInLink>{text.form.signIn}</SignInLink>
          <PrimaryButton type="submit" text={text.form.join} />
        </SignOrJoinContainer>
      </form>
    </LoginFormContainer>
  );
};
