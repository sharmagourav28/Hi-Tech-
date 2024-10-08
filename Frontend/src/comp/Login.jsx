import axios from "axios";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        userId,
        password,
      });

      if (res.data.message === "Login successful" && res.status === 200) {
        toast.success(`Successfully logged in as ${selectedRole}!`); // Success notification
        const roleRoutes = {
          hydro: "/hydro",
          admin: "/paneladmin",
          pdi: "/pdi",
        };

        const role = res.data.user.role;
        if (roleRoutes[role] && selectedRole === role) {
          navigate(roleRoutes[role]);
        } else {
          console.error("Unknown role:", role);
        }
      }
    } catch (error) {
      // If there's an error (invalid credentials)
      toast.error("Invalid User ID or Password!"); // Error notification
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer /> {/* Add this to display the toast notifications */}
      <div
        className="sm:flex h-screen"
        style={{
          backgroundImage: "url('assets/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-center flex-1 p-5 md:p-10 lg:p-16 text-gray-900">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-center">
              Welcome To Hi-Tech
            </h1>
            <p className="text-sm md:text-lg mb-8 lg:mb-10 text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <div className="flex justify-center space-x-3 md:space-x-5 mb-8">
              <a
                href="https://www.facebook.com/"
                className="bg-gray-700 p-3 md:p-4 rounded-full text-white hover:bg-orange-500 transition-all"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/"
                className="bg-gray-700 p-3 md:p-4 rounded-full text-white hover:bg-orange-500 transition-all"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/"
                className="bg-gray-700 p-3 md:p-4 rounded-full text-white hover:bg-orange-500 transition-all"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 p-8 md:p-16 ">
          <div className="max-w-xs md:max-w-md mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-gradient-slow drop-shadow-lg text-center">
              Sign In
            </h2>

            <form onSubmit={handleLogin}>
              <select
                className="w-full p-3 md:p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="pdi">PDI Tester</option>
                <option value="hydro">Hydro Tester</option>
              </select>
              <input
                type="text"
                className="w-full p-3 md:p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-gray-600">
                  Remember Me
                </label>
              </div>
              <button
                type="submit"
                className="w-full p-3 md:p-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                Sign in now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
