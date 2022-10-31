import { BrowserRouter } from "react-router-dom";

import { RoutesWrapper } from "./navigation";
import "./App.css";
import { Overlay } from "./components";
import { useStore } from "./store";

function App() {
  const isOverlayVisible = useStore((state) => state.isOverlayVisible);

  return (
    <BrowserRouter>
      {isOverlayVisible && <Overlay />}
      <RoutesWrapper />
    </BrowserRouter>
  );
}

export default App;
