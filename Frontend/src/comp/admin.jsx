import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Admin = () => {
  const [hydroTests, setHydroTests] = useState([]);
  const [sortField, setSortField] = useState("testDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");

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

  // Function to handle certificate download
  const handleGetCertificate = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hydro/certificate/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to generate certificate");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${id}_certificate.pdf`; // Name the downloaded file
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Hydro Test Records
        </h2>

        {/* Filter and Sort Controls */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <label className="mr-2">Sort By:</label>
              <select
                onChange={(e) => setSortField(e.target.value)}
                value={sortField}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="testDate">Test Date</option>
                <option value="htmfPartNumber">HTMF Part Number</option>
                <option value="customerPartNumber">Customer Part Number</option>
                <option value="serialNumber">Serial Number</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="mr-2">Order:</label>
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="mr-2">Filter By:</label>
              <select
                onChange={(e) => setFilterField(e.target.value)}
                value={filterField}
                className="p-2 border border-gray-300 rounded"
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
                className="p-1 border border-gray-300 rounded"
              />
            </div>

            <button
              onClick={() => setFilterValue("")}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
            >
              Clear Filter
            </button>
          </div>
        </div>

        {/* Table Display */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Test Date</th>
                <th className="px-4 py-2">HTMF Part Number</th>
                <th className="px-4 py-2">Customer Part Number</th>
                <th className="px-4 py-2">Serial Number</th>
                <th className="px-4 py-2">Hydro Pressure</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Welder Code</th>
                <th className="px-4 py-2">Operator</th>
                <th className="px-4 py-2">Witness Bay</th>
                <th className="px-4 py-2">Result</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hydroTests.map((test) => (
                <tr
                  key={test._id}
                  className={`bg-white border-b hover:bg-gray-100 transition ${
                    test.passFail === "Fail" ? "bg-red-100" : ""
                  }`}
                >
                  <td className="px-4 py-2">{test.testDate}</td>
                  <td className="px-4 py-2">{test.htmfPartNumber}</td>
                  <td className="px-4 py-2">{test.customerPartNumber}</td>
                  <td className="px-4 py-2">{test.serialNumber}</td>
                  <td className="px-4 py-2">{test.hydroPressure}</td>
                  <td className="px-4 py-2">{test.startTime}</td>
                  <td className="px-4 py-2">{test.endTime}</td>
                  <td className="px-4 py-2">{test.welderCode}</td>
                  <td className="px-4 py-2">{test.operator}</td>
                  <td className="px-4 py-2">{test.witnessBay}</td>
                  <td className="px-4 py-2">{test.passFail}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleGetCertificate(test._id)}
                      className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition"
                    >
                      Get Certificate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
