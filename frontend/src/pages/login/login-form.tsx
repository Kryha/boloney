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
  email: string;
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

  const emailIsRequiredError = errors.email && errors.email.type === "required";
  const passwordMinimumError = errors.password && errors.password.type === "min";

  const onSubmit = (email: string, password: string) => {
    authenticateUser(email, password);
  };

  return (
    <LoginFormContainer>
      <InformationContainer>
        <Heading1>{text.loginForm.firstThingsFirst}</Heading1>
        <Heading4>{text.loginForm.whoAreYou}</Heading4>
      </InformationContainer>
      <form onSubmit={handleSubmit((data) => onSubmit(data.email, data.password))}>
        <FormContainer>
          <AuthContainer width={width}>
            {/* TODO: remove email */}
            <Input label={text.loginForm.email} isError={emailIsRequiredError}>
              <BaseInput isError={emailIsRequiredError} type="text" defaultValue="" {...register("email", { required: true })} />
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
