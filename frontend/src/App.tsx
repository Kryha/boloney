import { BrowserRouter } from "react-router-dom";
import { RoutesWrapper } from "./navigation";
import "./App.css";
import { useInitAnalytics } from "./hooks/";

function App() {
  useInitAnalytics();

  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

export default App;
