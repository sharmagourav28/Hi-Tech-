import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Pdipage = () => {
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
            <div className="p-6  ">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Card 1: Hydro Test */}
                <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 shadow-lg rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Total Test</h3>
                    <div className="p-2 rounded-full bg-white text-purple-600">
                      <i className="fas fa-water"></i>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-4xl font-bold">18</h2>
                    {/* <div className="flex justify-between mt-1">
                      <p className="text-sm">Pass: 15</p>
                      <p className="text-sm">Fail: 03</p>
                    </div> */}
                  </div>
                </div>

                {/* Card 2: PDI Test */}
                <div className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Fails test</h3>
                    <div className="p-2 rounded-full bg-white text-red-600">
                      <i className="fas fa-tasks"></i>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-4xl font-bold">6</h2>
                    {/* <div className="flex justify-between mt-1">
      <p className="text-sm">Pass: 15</p>
      <p className="text-sm">Fail: 03</p>
    </div> */}
                  </div>
                </div>

                {/* Card 3: Teams */}
                <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Passed Test</h3>
                    <div className="p-2 rounded-full bg-white text-green-600">
                      <i className="fas fa-users"></i>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-4xl font-bold">12</h2>
                    {/* <p className="text-sm">1 Completed</p> */}
                  </div>
                </div>

                {/* Card 4: Productivity */}
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Productivity</h3>
                    <div className="p-2 rounded-full bg-white text-yellow-600">
                      <i className="fas fa-bullseye"></i>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-4xl font-bold">76%</h2>
                    {/* <p className="text-sm">5% Completed</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pdipage;
