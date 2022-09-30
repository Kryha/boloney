import { MINIMUM_PASSWORD_LENGTH, MINIMUM_USERNAME_LENGTH } from "../../constants";

export const authForm = {
  somethingWentWrong: "something went wrong.",
  firstThingsFirst: "first things first...",
  welcomeBack: "hey, welcome back!",
  whoAreYou: "who are you? We see you don't have an account or you are logged out. Create a new account or log in with an existing one!",
  goodSeeingYouAgain: "it's good seeing you again. I hope you didn't miss me too much. Sign in below and start playing right away.",
  iAlreadyHaveAnAccount: "i already have an account.",
  iDontHaveAnAccountYet: "i don't have an account yet.",
  register: "register",
  signIn: "sign in",
  join: "join",
  username: "username",
  password: "password",
  errorMessages: {
    usernameRequired: "username is required.",
    passwordRequired: "password is required.",
    usernameMinimum: `username must have at least ${MINIMUM_USERNAME_LENGTH} characters.`,
    passwordMinimum: `password must have at least ${MINIMUM_PASSWORD_LENGTH} characters.`,
    usernameAlreadyTaken: "username is already taken.",
    invalidCredentials: "invalid credentials.",
  },
};
