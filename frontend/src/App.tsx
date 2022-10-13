import { BrowserRouter } from "react-router-dom";

import { RoutesWrapper } from "./navigation";
import "./App.css";
import { Overlay } from "./components";
import { useUIState } from "./store/ui";

function App() {
  const isOverlayVisible = useUIState((state) => state.isOverlayVisible);

  return (
    <BrowserRouter>
      {isOverlayVisible && <Overlay />}
      <RoutesWrapper />
    </BrowserRouter>
  );
}

export default App;
