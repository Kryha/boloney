import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets/text";
import {
  Heading1,
  Heading4,
  Input,
  Paragraph,
  BaseInput,
  FormContainer,
  Link,
  PrimaryButton,
  GeneralContentWrapper,
} from "../../components";
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_USERNAME_LENGTH } from "../../constants";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, NkCode } from "../../interfaces";
import { routes } from "../../navigation";
import { useAuth } from "../../service/auth";
import { AuthContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";

// TODO: make a form component
export const CreateAccountForm: FC = () => {
  const { authenticateUser } = useAuth();
  const navigate = useNavigate();
  const { width, height } = useViewport();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  const showUsernameError = () => {
    if (errors.username?.type === "alreadyExists") return text.authForm.errorMessages.usernameAlreadyTaken;
    if (errors.username?.type === "minLength") return text.authForm.errorMessages.usernameMinimum;
    if (errors.username?.type === "required") return text.authForm.errorMessages.usernameRequired;
  };

  const onSubmit = async (username: string, password: string) => {
    const res = await authenticateUser(username, password, true);

    if (!res) return;

    if (res.code === NkCode.ALREADY_EXISTS) setError("username", { type: "alreadyExists" });
  };

  return (
    <LoginFormContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.firstThingsFirst}</Heading1>
        <Heading4>{text.authForm.whoAreYou}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthContainer>
            <Input label={text.authForm.username} isError={!!errors.username} errorMessage={showUsernameError()}>
              <BaseInput
                isError={!!errors.username}
                type="text"
                {...register("username", { required: true, minLength: MINIMUM_USERNAME_LENGTH })}
              />
            </Input>
            <Input label={text.authForm.password} isError={!!errors.password} errorMessage={text.authForm.errorMessages.passwordMinimum}>
              <BaseInput
                type="password"
                {...register("password", { required: true, minLength: MINIMUM_PASSWORD_LENGTH })}
                isError={!!errors.password}
              />
            </Input>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            <Paragraph>{text.authForm.iAlreadyHaveAnAccount}</Paragraph>
            <Link onClick={() => navigate(routes.login)} text={text.authForm.signIn} />
            <PrimaryButton type="submit" text={text.authForm.join} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
