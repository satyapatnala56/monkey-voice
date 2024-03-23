import { BrowserRouter, Routes, Route } from "react-router-dom";

import Affirmation from "./routes/Affirmation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Affirmation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
