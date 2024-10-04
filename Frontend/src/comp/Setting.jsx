import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setting = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("hydro"); // default role
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getUsers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createUser",
        {
          fullName,
          email,
          username,
          password,
          role,
        }
      );
      setMessage(response.data.message);
      setFullName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setRole("hydro"); // Reset to default
      toast.success("User created successfully!");

      const updatedUsers = await axios.get(
        "http://localhost:5000/api/getUsers"
      );
      setUsers(updatedUsers.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error occurred while creating user.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${userId}`
      );
      toast.success(response.data.message); // Show success message

      // Update the user list state to remove the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error occurred while deleting user.";
      toast.error(errorMessage); // Show error message
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 mt-20">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-2xl p-6">
          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-6">
            Create User
          </h2>
          <form onSubmit={handleCreateUser} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Email ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
              >
                <option value="admin">Admin</option>
                <option value="hydro">Hydro Test Engineer</option>
                <option value="pdi">PDI Test Engineer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 ease-in-out text-lg"
            >
              Create User
            </button>
          </form>
        </div>

        {/* Table to display users */}
        <div className="mt-12 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-6">User List</h2>
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-4">S.No</th>{" "}
                {/* Serial Number Column */}
                <th className="text-left p-4">Full Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Username</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Action</th> {/* Action Column */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <td className="p-4">{index + 1}</td> {/* Serial number */}
                  <td className="p-4">{user.fullName}</td> {/* Full Name */}
                  <td className="p-4">{user.email}</td> {/* Email */}
                  <td className="p-4">{user.username}</td> {/* Username */}
                  <td className="p-4">{user.role}</td> {/* Role */}
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>{" "}
                  {/* Delete Button */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Setting;
