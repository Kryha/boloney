import { useState } from "react";

import reactLogo from "./assets/react.svg";
import "./App.css";
import { Players } from "./service/fake-players";
import { GameLayout } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <GameLayout players={Players} />
    </div>
  );
}

export default App;
