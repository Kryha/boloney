import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./navigation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
