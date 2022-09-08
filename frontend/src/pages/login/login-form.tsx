import { FC } from "react";
import { useForm } from "react-hook-form";
import { text } from "../../assets/text";

import { Heading1, Heading4, Input, Paragraph, BaseInput } from "../../components";
import { PrimaryButton } from "../../components/buttons";
import { useViewport } from "../../hooks/use-viewport";
import { useAuthState } from "../../service/authentication";
import { AuthContainer, FormContainer, InformationContainer, LoginFormContainer, SignInLink, SignOrJoinContainer } from "./styles";

interface LoginProps {
  username: string;
  password: string;
}

export const LoginForm: FC = () => {
  const authenticateUser = useAuthState((state) => state.authenticateUser);
  const { width } = useViewport();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({ mode: "onChange", reValidateMode: "onChange" });

  const onSubmit = (username: string, password: string) => {
    console.log("we are here");
    authenticateUser({ username: username, password: password });
  };

  return (
    <LoginFormContainer>
      <InformationContainer>
        <Heading1>{text.loginForm.firstThingsFirst}</Heading1>
        <Heading4>{text.loginForm.whoAreYou}</Heading4>
      </InformationContainer>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          {/* <Input label={text.loginForm.username} error={errors.username && errors.username.type === "required"}>
            <BaseInput
              isError={errors.username && errors.username.type === "required"}
              type="text"
              defaultValue=""
              {...register("username", { required: true })}
            />
          </Input> */}
          <AuthContainer width={width}>
            {/* TODO: add validation */}
            <Input label={text.loginForm.email} error={errors.username && errors.username.type === "required"}>
              <BaseInput
                isError={errors.username && errors.username.type === "required"}
                type="text"
                defaultValue=""
                {...register("username", { required: true })}
              />
            </Input>
            <Input label={text.loginForm.password}>
              <BaseInput type="password" defaultValue="" {...register("password", { required: true })} />
            </Input>
          </AuthContainer>
          <SignOrJoinContainer>
            <Paragraph>{text.loginForm.iAlreadyHaveAnAccount}</Paragraph>
            <SignInLink>{text.loginForm.signIn}</SignInLink>
            <PrimaryButton type="submit" text={text.loginForm.join} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
