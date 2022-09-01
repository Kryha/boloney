import "./App.css";

// TODO: remove this component
import { Players } from "./service/fake-players";
import { GameLayout } from "./components/game-layout";
import { DiceRolls } from "./service/fake-dice-rolls";
import { PrimaryButton, SecondaryButton } from "./components/buttons";
import { LastBidOverview } from "./components/last-bid-overview/styles";
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Paragraph } from "./components";

function App() {
  return (
    <>
      {/* <GameLayout players={Players} dice={DiceRolls} /> */}
      {/* <PrimaryButton text="Primary active" />
      <SecondaryButton text="secondary active" />
      <LastBidOverview /> */}
      <Heading1>{"heading 1"}</Heading1>
      <Heading2>{"heading 2"}</Heading2>
      <Heading3>{"heading 3"}</Heading3>
      <Heading4>{"heading 4"}</Heading4>
      <Heading5>{"heading 5"}</Heading5>
      <Heading6>{"heading 6"}</Heading6>
      <Paragraph>
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      </Paragraph>
    </>
  );
}

export default App;
