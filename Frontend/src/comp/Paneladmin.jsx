import React from "react";
import Navbar from "../admin/Navbar";
import Sidebar from "../admin/Sidebar";

const Paneladmin = () => {
  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        {/* Main content to the right of the sidebar */}
        <div className="relative flex-grow  py-24 px-8 ml-64 mt-24 text-center overflow-hidden">
          {/* Main heading */}
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mt-24 mb-15">
            Hi-Tech System & Services Ltd.
          </h1>

          {/* Supporting text */}
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hi-Tech has been providing specialized products and engineering
            services to India’s power and process industries since 1989. We
            partner with both domestic and international manufacturers of power
            sector equipment thereby bringing the latest technology to our
            customers
          </p>

          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-[-1] overflow-hidden">
            <div className="absolute top-1/4 left-1/4 bg-gradient-to-r from-green-200 via-green-100 to-transparent rounded-full w-[600px] h-[600px] opacity-60 blur-3xl"></div>
            <div className="absolute top-0 right-1/4 bg-gradient-to-l from-blue-200 via-blue-100 to-transparent rounded-full w-[500px] h-[500px] opacity-60 blur-3xl"></div>
          </div>

          {/* Call-to-Action button */}
          <div className="mt-12">
            <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paneladmin;
