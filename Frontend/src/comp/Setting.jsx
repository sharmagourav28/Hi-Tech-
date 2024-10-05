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
      <div className="min-h-screen flex flex-col items-center justify-center p-4 mt-10">
        {" "}
        {/* Reduced padding */}
        <div className="flex flex-col md:flex-row gap-6 max-w-full w-full">
          {/* Left Side for Create User Form */}
          <div className="flex-1 w-full md:w-1/2 bg-white rounded-lg shadow-2xl p-4">
            {" "}
            {/* Reduced padding */}
            <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-4">
              {" "}
              {/* Reduced margin */}
              Create User
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              {" "}
              {/* Reduced space between inputs */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
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
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
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
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
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
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
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
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out sm:text-lg"
                >
                  <option value="admin">Admin</option>
                  <option value="hydro">Hydro Test Engineer</option>
                  <option value="pdi">PDI Test Engineer</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 ease-in-out text-lg"
              >
                Create User
              </button>
            </form>
          </div>

          {/* Right Side for User List */}
          <div className="flex-1 w-full md:w-1/2 bg-white rounded-lg shadow-2xl p-4">
            {" "}
            {/* Reduced padding */}
            <h2 className="text-2xl font-bold text-center mb-4">
              User List
            </h2>{" "}
            {/* Reduced margin */}
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-2">S.No</th>
                  <th className="text-left p-2">Full Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Username</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{user.fullName}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Setting;
