import { useState } from "react";
import "./App.css";
import Header from "./comp/Header.jsx";
import Footer from "./comp/Footer.jsx";
import Herosection from "./comp/Herosection.jsx";
import Hydro from "./comp/Hrdro.jsx";
import Pdi from "./comp/Pdi.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./comp/Contact.jsx";
import About from "./comp/About.jsx";
import Login from "./comp/Login.jsx";
import Admin from "./comp/admin.jsx";

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
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
