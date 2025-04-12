import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainSite from "./MainSite";
import Analyzer from "./Analyzer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/analytics" element={<Analyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
