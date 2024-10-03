import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const Setting = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("hydro"); // default role
  const [message, setMessage] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createUser",
        {
          username,
          password,
          role,
        }
      );
      setMessage(response.data.message);
      setUsername("");
      setPassword("");
      setRole("hydro"); // Reset to default
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Error occurred while creating user."
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Admin, Hydro or PDI Test User
        </h2>
        <form onSubmit={handleCreateUser} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="hydro">Hydro Test Engineer</option>
              <option value="pdi">PDI Test Engineer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Create User
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-lg text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Setting;
