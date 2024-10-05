import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import {
  FaUserTie,
  FaUserShield,
  FaClipboardCheck,
  FaWater,
} from "react-icons/fa";
import Header from "./Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Admin from "./admin";
import RecordHydro from "./RecordHydro";
import WelderFormAndTable from "./Welder";

const Dashboard = () => {
  const [stats, setStats] = useState({
    hydroUsers: 0,
    pdiUsers: 0,
    admins: 0,
    hydroTestsDone: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states for creating a new user
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const handleClick = (page) => {
    setActive(page);
    navigate(`/${page}`);
  };

  // Fetch user list and stats concurrently
  const fetchData = async () => {
    setLoading(true);
    try {
      const [userResponse, statsResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/getUsers"),
        axios.get("http://localhost:5000/api/total-stats"),
      ]);
      setUsers(userResponse.data);
      setStats(statsResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    console.log(userId);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${userId}`
      );
      toast.success(response.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error occurred while deleting user.";
      toast.error(errorMessage);
    }
  };

  // Handle create user form submit
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
      toast.success("User created successfully!");
      setFullName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setRole("admin");
      fetchData(); // Refresh the user list after creating a new user
    } catch (error) {
      toast.error("Error creating user.");
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="p-6 mt-20 bg-gray-50 min-h-screen">
        <Header />
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 mt-10">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Welcome back, Admin. Here are the current system statistics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value]) => {
            const icons = {
              hydroUsers: <FaUserTie className="text-blue-600 text-5xl" />,
              pdiUsers: <FaUserShield className="text-green-600 text-5xl" />,
              admins: <FaClipboardCheck className="text-yellow-600 text-5xl" />,
              hydroTestsDone: <FaWater className="text-teal-600 text-5xl" />,
            };

            const displayLabel = key.replace(/([A-Z])/g, " $1").toUpperCase();

            return (
              <div
                key={key}
                className="bg-gradient-to-r from-blue-100 to-blue-200 border border-gray-300 rounded-lg shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                {icons[key]}
                <h2 className="text-lg font-medium text-gray-800 mt-4">
                  {displayLabel}
                </h2>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap mt-6">
          {/* User List */}
          <div className="flex-1 w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 mt-6 overflow-x-auto">
            <h2 className="text-2xl font-bold text-center mb-4">HITech User</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr className="border-b">
                  <th className="text-left p-4 text-gray-700 font-semibold">
                    S.No
                  </th>
                  <th className="text-left p-4 text-gray-700 font-semibold">
                    Full Name
                  </th>
                  <th className="text-left p-4 text-gray-700 font-semibold">
                    Email
                  </th>
                  <th className="text-left p-4 text-gray-700 font-semibold">
                    Username
                  </th>
                  <th className="text-left p-4 text-gray-700 font-semibold">
                    Role
                  </th>
                  <th className="text-left p-4 text-gray-700 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition duration-200 ease-in-out"
                  >
                    <td className="p-4 text-gray-600">
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td className="p-4 text-gray-600">{user.fullName}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4 text-gray-600">{user.username}</td>
                    <td className="p-4 text-gray-600">{user.role}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200 flex items-center justify-center"
                        aria-label="Delete User"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
              {Array.from({
                length: Math.ceil(users.length / usersPerPage),
              }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => paginate(pageIndex + 1)}
                  className={`mx-1 px-3 py-2 border rounded transition duration-200 ${
                    currentPage === pageIndex + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {pageIndex + 1}
                </button>
              ))}
            </div>
          </div>

          {/* User Creation Form */}
          <div className="flex-1 w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6 mt-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Create New User
            </h2>
            <form onSubmit={handleCreateUser}>
              {/* Full Name Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              {/* Username Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="hydro">Hydro</option>
                  <option value="pdi">PDI</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
      <WelderFormAndTable />
      <RecordHydro />

      <Admin />

      <ToastContainer />
    </>
  );
};

export default Dashboard;
