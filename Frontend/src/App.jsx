import { useState } from "react";
import "./App.css";
import Hydro from "./comp/Hrdro.jsx";
import Pdi from "./comp/Pdi.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./comp/Dashboard.jsx";
import About from "./comp/About.jsx";
import Login from "./comp/Login.jsx";
import Admin from "./comp/admin.jsx";
import Setting from "./comp/Setting.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hydro" element={<Hydro />} />
        <Route path="/pdi" element={<Pdi />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
