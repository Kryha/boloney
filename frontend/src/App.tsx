import "./App.css";

// TODO: remove this component
import { Players } from "./service/fake-players";
import { GameLayout } from "./components/game-layout";
import { DiceRolls } from "./service/fake-dice-rolls";

function App() {
  return <GameLayout players={Players} dice={DiceRolls} />;
}

export default App;
