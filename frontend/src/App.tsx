import "./App.css";

// TODO: remove this component
import { Players } from "./service/fake-players";
import { GameLayout } from "./components/game-layout";

function App() {
  return <GameLayout players={Players} />;
}

export default App;
