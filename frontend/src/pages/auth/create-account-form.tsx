import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets/text";
import {
  Heading1,
  Heading4,
  Paragraph,
  BaseInput,
  FormContainer,
  Link,
  PrimaryButton,
  GeneralContentWrapper,
  InputLegend,
} from "../../components";
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_USERNAME_LENGTH } from "../../constants";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, isNkError, NkCode } from "../../types";
import { routes } from "../../navigation";
import { useAuth } from "../../service";
import { AuthContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";
import { useStore } from "../../store";

// TODO: make a form component
export const CreateAccountForm: FC = () => {
  const { authenticateUser } = useAuth();
  const navigate = useNavigate();
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const { width, height } = useViewport();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  //TODO: refactor this and getFieldName() function to better define these fields.
  const showUsernameError = () => {
    const ALREADY_EXISTS = "Username already exists";
    const MIN_LENGTH = "minLength";
    const REQUIRED = "required";
    switch (errors.username?.type) {
      case ALREADY_EXISTS:
        return text.authForm.errorMessages.usernameAlreadyTaken;
      case MIN_LENGTH:
        return text.authForm.errorMessages.usernameMinimum;
      case REQUIRED:
        return text.authForm.errorMessages.usernameRequired;
      default:
        return "";
    }
  };

  const getFieldName = (code: NkCode): "username" | "password" => {
    const username = "username";
    const password = "password";
    if (code === NkCode.ALREADY_EXISTS) {
      return username;
    } else {
      return password;
    }
  };

  const onSubmit = async (username: string, password: string) => {
    if (!isValid) return;
    setSpinnerVisibility(true);
    const res = await authenticateUser(username, password, true);
    setSpinnerVisibility(false);
    if (!isNkError(res)) return navigate(routes.home);
    setError(getFieldName(res.code), { type: res.message }); // response is an error
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
            <InputLegend label={text.authForm.username} isError={!!errors.username} errorMessage={showUsernameError()} isRow>
              <BaseInput type="text" {...register("username", { required: true, minLength: MINIMUM_USERNAME_LENGTH })} />
            </InputLegend>
            <InputLegend
              label={text.authForm.password}
              isError={!!errors.password}
              errorMessage={text.authForm.errorMessages.passwordMinimum}
              isRow
              childNode={2}
            >
              <BaseInput type="password" {...register("password", { required: true, minLength: MINIMUM_PASSWORD_LENGTH })} />
            </InputLegend>
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
