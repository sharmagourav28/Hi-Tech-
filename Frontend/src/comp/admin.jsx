import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [hydroTests, setHydroTests] = useState([]);
  const [sortField, setSortField] = useState("testDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Fixed records per page

  useEffect(() => {
    const fetchHydroTests = async () => {
      try {
        const query = new URLSearchParams({
          sortField,
          sortOrder,
          filterField,
          filterValue,
        }).toString();

        const response = await fetch(
          `http://localhost:5000/api/hydro/all?${query}`
        );
        const data = await response.json();
        setHydroTests(data);
      } catch (error) {
        console.error("Error fetching hydro test data:", error);
      }
    };

    fetchHydroTests();
  }, [sortField, sortOrder, filterField, filterValue]);

  // Calculate the records to display based on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = hydroTests.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(hydroTests.length / recordsPerPage);

  // Function to handle changing pages
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen w-full mt-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-600">
          Hydro Test Records
        </h2>

        {/* Filter and Sort Controls */}
        <div className="mb-8 flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 items-center w-full lg:w-auto">
            {/* Sort By */}
            <div className="flex items-center w-full lg:w-auto">
              <label className="mr-2 font-semibold">Sort By:</label>
              <select
                onChange={(e) => setSortField(e.target.value)}
                value={sortField}
                className="w-full lg:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="testDate">Test Date</option>
                <option value="htmfPartNumber">HTMF Part Number</option>
                <option value="customerPartNumber">Customer Part Number</option>
                <option value="serialNumber">Serial Number</option>
              </select>
            </div>

            {/* Order */}
            <div className="flex items-center w-full lg:w-auto">
              <label className="mr-2 font-semibold">Order:</label>
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
                className="w-full lg:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Filter By */}
            <div className="flex items-center w-full lg:w-auto">
              <label className="mr-2 font-semibold">Filter By:</label>
              <select
                onChange={(e) => setFilterField(e.target.value)}
                value={filterField}
                className="w-full lg:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="">None</option>
                <option value="htmfPartNumber">HTMF Part Number</option>
                <option value="customerPartNumber">Customer Part Number</option>
                <option value="serialNumber">Serial Number</option>
              </select>
              <input
                type="text"
                placeholder="Filter value"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="ml-2 w-full lg:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>

            {/* Clear Filter Button */}
            <button
              onClick={() => setFilterValue("")}
              className="w-full lg:w-auto bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Clear Filter
            </button>
          </div>
        </div>

        {/* Table Display */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 font-semibold">Test Date</th>
                <th className="px-4 py-3 font-semibold">HTMF Part Number</th>
                <th className="px-4 py-3 font-semibold">
                  Customer Part Number
                </th>
                <th className="px-4 py-3 font-semibold">Serial Number</th>
                <th className="px-4 py-3 font-semibold">Hydro Pressure</th>
                <th className="px-4 py-3 font-semibold">Start Time</th>
                <th className="px-4 py-3 font-semibold">End Time</th>
                <th className="px-4 py-3 font-semibold">Welder Code</th>
                <th className="px-4 py-3 font-semibold">Operator</th>
                <th className="px-4 py-3 font-semibold">Witness Bay</th>
                <th className="px-4 py-3 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((test) => (
                <tr
                  key={test._id}
                  className={`border-b hover:bg-gray-50 transition ${
                    test.passFail === "Fail"
                      ? "bg-red-50 border-l-4 border-red-500"
                      : ""
                  }`}
                >
                  <td className="px-4 py-3">{test.testDate}</td>
                  <td className="px-4 py-3">{test.htmfPartNumber}</td>
                  <td className="px-4 py-3">{test.customerPartNumber}</td>
                  <td className="px-4 py-3">{test.serialNumber}</td>
                  <td className="px-4 py-3">{test.hydroPressure}</td>
                  <td className="px-4 py-3">{test.startTime}</td>
                  <td className="px-4 py-3">{test.endTime}</td>
                  <td className="px-4 py-3">{test.welderCode}</td>
                  <td className="px-4 py-3">{test.operator}</td>
                  <td className="px-4 py-3">{test.witnessBay}</td>
                  <td
                    className={`px-4 py-3 ${
                      test.passFail === "Fail" ? "text-red-600 font-bold" : ""
                    }`}
                  >
                    {test.passFail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 border ${
                index + 1 === currentPage
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-indigo-500"
              } rounded-lg shadow-md hover:bg-indigo-400 transition`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
