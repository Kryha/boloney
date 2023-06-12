import { MINIMUM_USERNAME_LENGTH } from "../../constants";

export const authForm = {
  somethingWentWrong: "something went wrong.",
  createAccount: "create account",
  login: "login",
  readyToBluff: "ready to Bluff",
  whoAreYou: "who goes there? Looks like you don’t have an account yet, so create one to play.",
  followWalletSteps: "follow the steps on the Aleo Popup to connect your wallet...",
  completeWalletSignature: "complete the wallet signature to continue.",
  walletCorrectlyConnected: "your Aleo Wallet is correctly connected.",
  connectWithWallet: "connect with wallet",
  connecting: "connecting",
  connected: "connected",
  validatingSignature: "validating signature",
  signatureValidated: "signature validated",
  join: "join",
  username: "username",
  confirmUsername: "confirm username",
  letsRoll: "let's roll!",
  errorMessages: {
    usernameRequired: "username is required.",
    usernameMinimum: `username must have at least ${MINIMUM_USERNAME_LENGTH} characters.`,
    usernameAlreadyTaken: "username is already taken.",
    usernameProfanity: "username contains profanity.",
    usernameCharacters: "username contains invalid characters.",
    usernamesDoNotMatch: "usernames do not match.",
    invalidCredentials: "invalid credentials.",
    internal: "internal error. Please try again later.",
  },

  welcomeBack: (username: string) => `Welcome Back ${username}, seems you're ready to go! `,
  welcome: (username: string) => `Welcome ${username}, seems you're ready to go! `,
};
