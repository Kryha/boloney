import { MINIMUM_USERNAME_LENGTH } from "../../constants";

export const authForm = {
  somethingWentWrong: "something went wrong.",
  createAccount: "create account",
  login: "login",
  readyToBluff: "ready to Bluff",
  whoAreYou: "who goes there? Looks like you don’t have an account yet, so create one to play.",
  connectBelow: "hello there! Connect below with your Aleo Wallet to play Boloney!",
  noWalletYet: "no wallet yet?",
  clickToGetOne: "Click here to get one", // TODO: refactor RowHeadingIcon so we can capitalize only the frist letter
  followWalletSteps: "follow the steps on the Aleo Popup to connect your wallet...",
  completeWalletSignature: "complete the wallet signature to continue.",
  walletCorrectlyConnected: "your Aleo Wallet is correctly connected.",
  walletConnectionFailed: "there was an issue and the Wallet connection failed. Please try again.",
  connectWithWallet: "connect with wallet",
  connecting: "connecting",
  connected: "connected",
  connectedExclamation: "connected!",
  validatingSignature: "validating signature",
  signatureValidated: "signature validated",
  join: "join",
  username: "username",
  confirmUsername: "confirm username",
  letsRoll: "let's roll!",
  clickPopUp: "Please, click again until a Aleo pop-up or webpage is open",
  walletInstructions:
    "If you have an Aleo wallet, a popup to connect will open. If you do not, the Aleo Website will open in a tab. Come back and refresh the page with a wallet to enjoy Boloney!",
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
