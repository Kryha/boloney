import { MINIMUM_PASSWORD_LENGTH, MINIMUM_USERNAME_LENGTH } from "../../constants";

export const authForm = {
  somethingWentWrong: "something went wrong.",
  createAccount: "create account",
  welcomeBack: "hello again",
  whoAreYou: "who goes there? Looks like you don’t have an account yet, so create one to play.",
  goodSeeingYouAgain: "good to see you’re fulla Boloney! Sign back in to play.",
  iAlreadyHaveAnAccount: "do you have an account? Sign in",
  iDontHaveAnAccountYet: "don’t have an account yet? Create one",
  register: "register",
  signIn: "sign in",
  here: "here",
  join: "join",
  username: "username",
  password: "password",
  errorMessages: {
    usernameRequired: "username is required.",
    passwordRequired: "password is required.",
    usernameMinimum: `username must have at least ${MINIMUM_USERNAME_LENGTH} characters.`,
    passwordMinimum: `password must have at least ${MINIMUM_PASSWORD_LENGTH} characters.`,
    usernameAlreadyTaken: "username is already taken.",
    usernameProfanity: "username contains profanity.",
    invalidCredentials: "invalid credentials.",
  },
};
