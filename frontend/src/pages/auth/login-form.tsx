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
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, NkCode } from "../../interfaces";
import { routes } from "../../navigation";
import { useAuth } from "../../service/auth";
import { AuthContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";

// TODO: make a form component
export const LoginForm: FC = () => {
  const { authenticateUser } = useAuth();
  const navigate = useNavigate();
  const { width, height } = useViewport();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  const showPasswordError = () => {
    switch (errors.password?.type) {
      case NkCode.NOT_FOUND.toString():
        return text.authForm.errorMessages.invalidCredentials;
      case "required":
        return text.authForm.errorMessages.passwordRequired;
      default:
        return "";
    }
  };

  const onSubmit = async (username: string, password: string) => {
    if (!isValid) return;
    const res = await authenticateUser(username, password);
    if (!res) return;
    setError("password", { type: res.code.toString() });
  };

  return (
    <LoginFormContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.welcomeBack}</Heading1>
        <Heading4>{text.authForm.goodSeeingYouAgain}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthContainer>
            <Input label={text.authForm.username} isError={!!errors.username} errorMessage={text.authForm.errorMessages.usernameRequired}>
              <BaseInput isError={!!errors.username} type="text" {...register("username", { required: true })} />
            </Input>
            <Input label={text.authForm.password} isError={!!errors.password} errorMessage={showPasswordError()}>
              <BaseInput type="password" {...register("password", { required: true })} isError={!!errors.password} />
            </Input>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            <Paragraph>{text.authForm.iDontHaveAnAccountYet}</Paragraph>
            <Link onClick={() => navigate(routes.createAccount)} text={text.authForm.register} />
            <PrimaryButton type="submit" text={text.authForm.signIn} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
