import React, { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx"; // Import the XLSX library for Excel export

const Admin = () => {
  const [hydroTests, setHydroTests] = useState([]);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Fixed records per page

  useEffect(() => {
    const fetchHydroTests = async () => {
      try {
        const query = new URLSearchParams({
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
  }, [filterField, filterValue]);

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

  // Function to handle exporting hydro tests to Excel
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(hydroTests);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Hydro Tests");
    XLSX.writeFile(wb, "Hydro_Tests.xlsx");
    toast.success("Data exported to Excel successfully!");
  };

  return (
    <>
      <div className="p-6 pt-10 bg-gray-50 min-h-screen w-full ">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-800">
          Hydro Test Records
        </h2>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-wrap justify-center items-center bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
          <div className="flex items-center">
            <label className="mr-2 font-semibold text-gray-700">
              Filter By:
            </label>
            <select
              onChange={(e) => setFilterField(e.target.value)}
              value={filterField}
              className="w-full lg:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out"
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
              className="ml-2 w-full lg:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 transition duration-200 ease-in-out"
            />
            <button
              onClick={() => setFilterValue("")}
              className="ml-2 w-full lg:w-auto bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200 ease-in-out"
            >
              Clear Filter
            </button>
            {/* Download Data Button */}
            <button
              onClick={handleExportToExcel}
              className="ml-2 w-full lg:w-auto bg-green-600 text-white p-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
            >
              Download Data
            </button>
          </div>
        </div>

        {/* Table Display */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-indigo-200">
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Test Date
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  HTMF Part Number
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Customer Part Number
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Serial Number
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Hydro Pressure
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Start Time
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  End Time
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Welder Code
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Operator
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Witness Bay
                </th>
                <th className="px-2 py-2 font-semibold text-sm text-indigo-800">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((test) => (
                <tr
                  key={test._id}
                  className={`border-b hover:bg-indigo-50 transition ${
                    test.passFail === "Fail"
                      ? "bg-red-50 border-l-4 border-red-500"
                      : ""
                  }`}
                >
                  <td className="px-2 py-2 text-sm">{test.testDate}</td>
                  <td className="px-2 py-2 text-sm">{test.htmfPartNumber}</td>
                  <td className="px-2 py-2 text-sm">
                    {test.customerPartNumber}
                  </td>
                  <td className="px-2 py-2 text-sm">{test.serialNumber}</td>
                  <td className="px-2 py-2 text-sm">{test.hydroPressure}</td>
                  <td className="px-2 py-2 text-sm">{test.startTime}</td>
                  <td className="px-2 py-2 text-sm">{test.endTime}</td>
                  <td className="px-2 py-2 text-sm">{test.welderCode}</td>
                  <td className="px-2 py-2 text-sm">{test.operator}</td>
                  <td className="px-2 py-2 text-sm">{test.witnessBay}</td>
                  <td
                    className={`px-2 py-2 text-sm ${
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
      <ToastContainer /> {/* This renders the toast messages */}
    </>
  );
};

export default Admin;
