import { FC } from "react";
import { useForm } from "react-hook-form";
import { text } from "../../assets/text";

import { Heading1, Heading4, Input, Paragraph, BaseInput } from "../../components";
import { Link, PrimaryButton } from "../../components/buttons";
import { MINIMUM_PASSWORD_LENGTH } from "../../constants";
import { useViewport } from "../../hooks/use-viewport";
import { useAuth } from "../../service/auth";
import { AuthContainer, FormContainer, InformationContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";

interface LoginProps {
  username: string;
  password: string;
}

export const LoginForm: FC = () => {
  const { authenticateUser } = useAuth();
  const { width, height } = useViewport();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({ mode: "onChange", reValidateMode: "onChange" });

  const usernameIsRequiredError = errors.username && errors.username.type === "required";
  const passwordMinimumError = errors.password && errors.password.type === "min";

  const onSubmit = (username: string, password: string) => {
    const CREATE_NEW_USER = true;
    authenticateUser(username, password, CREATE_NEW_USER);
  };

  return (
    <LoginFormContainer>
      <InformationContainer>
        <Heading1>{text.loginForm.firstThingsFirst}</Heading1>
        <Heading4>{text.loginForm.whoAreYou}</Heading4>
      </InformationContainer>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthContainer width={width}>
            <Input label={text.loginForm.username} isError={usernameIsRequiredError}>
              <BaseInput isError={usernameIsRequiredError} type="text" defaultValue="" {...register("username", { required: true })} />
            </Input>
            <Input label={text.loginForm.password} isError={passwordMinimumError}>
              <BaseInput
                type="password"
                defaultValue=""
                {...register("password", { required: true, min: MINIMUM_PASSWORD_LENGTH })}
                isError={passwordMinimumError}
              />
            </Input>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            <Paragraph>{text.loginForm.iAlreadyHaveAnAccount}</Paragraph>
            <Link text={text.loginForm.signIn} />
            <PrimaryButton type="submit" text={text.loginForm.join} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
