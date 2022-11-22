import { BrowserRouter } from "react-router-dom";

import { RoutesWrapper } from "./navigation";
import "./App.css";
import { Overlay } from "./components";
import { useStore } from "./store";
import { OverlaySpinner } from "./components/overlay-spinner";

function App() {
  const isOverlayVisible = useStore((state) => state.isOverlayVisible);

  return (
    <BrowserRouter>
      {isOverlayVisible && <Overlay />}
      <RoutesWrapper />
      <OverlaySpinner />
    </BrowserRouter>
  );
}

export default App;
