import { useState } from "react";
import "./App.css";
import Hydro from "./comp/Hrdro.jsx";
import Pdi from "./comp/Pdi.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./comp/Dashboard.jsx";

import Login from "./comp/Login.jsx";
import Admin from "./comp/admin.jsx";
import Setting from "./comp/Setting.jsx";
import Product from "./comp/Product.jsx";
import Paneladmin from "./comp/Paneladmin.jsx";

// admin folder
import Mainpage from "./admin/Mainpage.jsx";
import Pdipage from "./admin/Pdipage.jsx";
import Hydropage from "./admin/Hydropage.jsx";
import Userpage from "./admin/Userpage.jsx";
import Productpage from "./admin/Productpage.jsx";
import Welderpage from "./admin/Welderpage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hydro" element={<Hydro />} />
        <Route path="/pdi" element={<Pdi />} />
        <Route path="/paneladmin" element={<Paneladmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/product" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/pdipage" element={<Pdipage />} />
        <Route path="/hydropage" element={<Hydropage />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/welderpage" element={<Welderpage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
