import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import WelderFormAndTable from "../comp/Welder";

const Welderpage = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content area below the Navbar */}
        <div className="flex flex-grow">
          {/* Sidebar on the left */}
          <Sidebar />
          {/* Main content to the right of the sidebar */}
          <div className="flex-grow bg-white p-8 ml-64 mt-16">
            {/* Adjust ml-64 to match the width of the sidebar */}
            <WelderFormAndTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welderpage;
