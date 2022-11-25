import { BrowserRouter } from "react-router-dom";

import { RoutesWrapper } from "./navigation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

export default App;
