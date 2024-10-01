import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");
  const navigate = useNavigate(); // Initialize useNavigate

  // Predefined credentials
  const credentials = {
    Admin: { userId: "adminUser", password: "adminPass" },
    "PDI Tester": { userId: "pdiUser", password: "pdiPass" },
    "Hydro Tester": { userId: "hydroUser", password: "hydroPass" },
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the entered credentials match the predefined ones
    if (
      userId === credentials[selectedRole].userId &&
      password === credentials[selectedRole].password
    ) {
      // Redirect based on the selected role
      switch (selectedRole) {
        case "Admin":
          navigate("/admin"); // Redirect to Admin page
          break;
        case "Hydro Tester":
          navigate("/hydro"); // Redirect to Hydro page
          break;
        case "PDI Tester":
          navigate("/pdi"); // Redirect to PDI page
          break;
        default:
          break;
      }
    } else {
      // Handle incorrect credentials (you can show an error message here)
      alert("Invalid User ID or Password!");
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center overflow"
      style={{ backgroundImage: 'url("")' }}
    >
      {/* Welcome Section */}
      <div className="flex-1 flex flex-col justify-center p-10 text-gray-900">
        <h1 className="text-5xl font-bold mb-5">Welcome To Hi-Tech</h1>
        <p className="text-lg mb-10">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className="flex space-x-5 ml-10">
          {/* Social Media Icons */}
          <a
            href="https://www.instagram.com/accounts/login/?hl=en"
            className="bg-gray-700 p-4 rounded-full text-white hover:bg-orange-500 transition-all"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/accounts/login/?hl=en"
            className="bg-gray-700 p-4 rounded-full text-white hover:bg-orange-500 transition-all"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/accounts/login/?hl=en"
            className="bg-gray-700 p-4 rounded-full text-white hover:bg-orange-500 transition-all"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center p-16 bg-white bg-opacity-80">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-8">Sign in</h2>

          {/* Role Dropdown */}
          <select
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="PDI Tester">PDI Tester</option>
            <option value="Hydro Tester">Hydro Tester</option>
          </select>

          {/* User ID Input */}
          <input
            type="text"
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-600">
              Remember Me
            </label>
          </div>

          {/* Sign In Button */}
          <button
            className="w-full p-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            onClick={handleLogin} // Call handleLogin on button click
          >
            Sign in now
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4 text-blue-500 cursor-pointer hover:underline">
            Lost your password?
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8 text-sm text-gray-500">
            By clicking on "Sign in now" you agree to our
            <a
              href="https://www.instagram.com/accounts/login/?hl=en"
              className="text-blue-500 ml-1 hover:underline"
            >
              Terms of Service
            </a>
            |
            <a
              href="https://www.instagram.com/accounts/login/?hl=en"
              className="text-blue-500 ml-1 hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
