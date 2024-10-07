import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Mainpage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content area below the Navbar */}
        <div className="flex flex-grow">
          {/* Sidebar on the left */}
          <Sidebar />

          {/* Main content to the right of the sidebar */}
          <div className="flex-grow bg-white p-8 ml-64 mt-16">
            {/* Dashboard cards content */}
            <div className="p-6 bg-gray-50 ">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Card 1: Hydro Test */}
                <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 shadow-lg rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">HYDRO test</h3>
                    <div className="p-2 rounded-full bg-white text-purple-600">
                      <i className="fas fa-water"></i>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-4xl font-bold">18</h2>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm">Pass: 15</p>
                      <p className="text-sm">Fail: 03</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: PDI Test */}
                <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">PDI test</h3>
                    <div className="p-2 rounded-full bg-white text-blue-600">
                      <i className="fas fa-tasks"></i>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-4xl font-bold">18</h2>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm">Pass: 15</p>
                      <p className="text-sm">Fail: 03</p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Teams */}
                <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg rounded-xl p-5 flex flex-col justify-between text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Teams</h3>
                    <div className="p-2 rounded-full bg-white text-green-600">
                      <i className="fas fa-users"></i>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-4xl font-bold">12</h2>
                    <p className="text-sm">1 Completed</p>
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
                    <p className="text-sm">5% Completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Data Section */}
              <div className="col-span-2 bg-gray-100 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">User Data</h2>

                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="flex items-center justify-between bg-gray-200 p-4 rounded-md shadow-md">
                    <div className="w-1/12 font-semibold">S.No</div>
                    <div className="w-4/12 font-semibold">Full Name</div>
                    <div className="w-4/12 font-semibold">Email</div>
                    <div className="w-3/12 font-semibold">Username</div>
                    <div className="w-3/12 font-semibold">Role</div>
                    <div className="w-2/12 font-semibold text-center">
                      Action
                    </div>
                  </div>

                  {/* User Rows */}
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between bg-white p-4 rounded-md shadow-md transition-colors duration-300 hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <div className="w-1/12">{index + 1}</div>
                      <div className="w-4/12">User {index + 1}</div>
                      <div className="w-4/12">user{index + 1}@example.com</div>
                      <div className="w-3/12">user{index + 1}</div>
                      <div className="w-3/12">Role {index + 1}</div>
                      <div className="w-2/12 text-center">
                        <button className="text-red-600 hover:text-red-800 p-1 rounded border border-red-600 hover:bg-red-600 hover:text-white transition duration-200">
                          <i className="fas fa-trash"></i> {/* Delete Icon */}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Performance Section */}
              <div className="bg-gray-100 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Tasks Performance
                </h2>

                {/* Circle Graph Placeholder */}
                <div className="flex justify-center items-center mb-8">
                  <div className="relative w-40 h-40">
                    {/* Replace with actual circular progress */}
                    <svg className="w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        strokeWidth="6"
                        stroke="#4caf50"
                        fill="transparent"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        strokeWidth="6"
                        stroke="#fdd835"
                        fill="transparent"
                        strokeDasharray="100, 100"
                        strokeDashoffset="32"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        strokeWidth="6"
                        stroke="#f44336"
                        fill="transparent"
                        strokeDasharray="100, 100"
                        strokeDashoffset="68"
                      />
                    </svg>
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-500">76%</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-500">32%</p>
                    <p className="text-sm text-gray-600">In-Progress</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-500">13%</p>
                    <p className="text-sm text-gray-600">Behind</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
