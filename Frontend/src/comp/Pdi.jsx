import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";

// Function to check serial number against the backend
const checkSerialNumber = async (serialNumber, customerPartNumber) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/hydro/check/${serialNumber}?customerPartNumber=${customerPartNumber}`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Not Found");
    }

    const data = await response.json();
    return data.result; // Return the status from the response
  } catch (error) {
    console.error("Error checking serial number:", error);
    return null; // Return null in case of error
  }
};

const Pdi = () => {
  const data = [
    {
      parameter: 'Apple MacBook Pro 17"',
      specification: "Silver",
      methodOfInspection: "Visual Inspection",
    },
    {
      parameter: "Dell XPS 15",
      specification: "Black",
      methodOfInspection: "Manual Check",
    },
    {
      parameter: "HP Spectre x360",
      specification: "Blue",
      methodOfInspection: "Automated Testing",
    },
  ];

  const [testDate, setTestDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0]; // Default to current date
    return today;
  });
  const [remark, setRemark] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [customerPartNumber, setCustomerPartNumber] = useState(""); // State for customer part number
  const [checkStatus, setCheckStatus] = useState(""); // State to hold check result
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [partNumber, setPartNumber] = useState("");
  const [partName, setPartName] = useState("");
  const [processCode, setProcessCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [ishydropass, setIsHydroPass] = useState(false);

  // Check if the generate certificate button should be enabled
  const isButtonEnabled = serialNumber.length === 12 && checkStatus === "Pass";

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to generate certificate or any further processing
    // console.log({
    //   testDate,
    //   remark,
    //   serialNumber,
    //   customerPartNumber, // Log the customer part number
    // });
    handleCheck();
  };

  // Handle check button click
  const handleCheck = async () => {
    setErrorMessage(""); // Clear any previous error mssages
    const status = await checkSerialNumber(serialNumber, customerPartNumber);
    console.log(status);
    if (status === "Pass") {
      setCheckStatus("Pass");
      setIsHydroPass(true);
      await handleLoadParametes();
    } else if (status === "Fail") {
      setCheckStatus("Fail");
      setIsHydroPass(false);
    } else {
      setCheckStatus("Not Found");
      setErrorMessage("Serial number not found. Please check again.");
      setIsHydroPass(false);
    }
  };

  const [htmfData, setHtmfData] = useState([]);

  const handleLoadParametes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hydro/htmf/${customerPartNumber}`
      );

      // Ensure response structure is correct
      if (response.data && Array.isArray(response.data.selectedParameters)) {
        setHtmfData(response.data.selectedParameters);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data for selected ID:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center p-12 mt-20">
        <div className="mx-auto w-full max-w-[550px] mt-12">
          {" "}
          {/* Added bg-yellow-200 */}
          {/* Heading for the form */}
          <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-8 tracking-wide uppercase font-poppins ">
            Hi-Tech Metal Pdi Test
          </h2>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            {/* Form Fields Container */}
            <div className="flex flex-wrap mb-5 gap-4">
              {/* Test Date */}
              <div className="flex-grow">
                <label
                  htmlFor="testDate"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Test Date
                </label>
                <input
                  type="date"
                  name="testDate"
                  id="testDate"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>

              {/* Serial Number */}
              <div className="flex-grow relative">
                <label
                  htmlFor="serialNumber"
                  className="mb-2 block text-base font-medium text-[#07074D]"
                >
                  Serial Number (14 Digits)
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="serialNumber"
                    id="serialNumber"
                    value={serialNumber}
                    onChange={(e) =>
                      setSerialNumber(e.target.value.toUpperCase())
                    }
                    maxLength={14}
                    pattern="^[A-Z0-9]{14}$"
                    required
                    className="flex-grow rounded-l-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-1"
                  />
                </div>
              </div>

              {/* Customer Part Number */}
              <div className="flex-grow justify-center">
                <label
                  htmlFor="customerPartNumber"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  HMFT Number
                </label>
                <input
                  type="text"
                  name="customerPartNumber"
                  id="customerPartNumber"
                  required
                  value={customerPartNumber}
                  onChange={(e) => setCustomerPartNumber(e.target.value)}
                  placeholder="Enter customer part number"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              {/* Part Number */}
              <div className="flex-grow justify-center">
                <label
                  htmlFor="partNumber"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Part Number
                </label>
                <input
                  type="text"
                  required
                  name="partNumber"
                  id="partNumber"
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                  placeholder="Enter part number"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              {/* Part Name */}
              <div className="flex-grow justify-center">
                <label
                  htmlFor="partName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Part Name
                </label>
                <input
                  type="text"
                  required
                  name="partName"
                  id="partName"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  placeholder="Enter part name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              {/* Process Code */}
              <div className="flex-grow justify-center">
                <label
                  htmlFor="processCode"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Process Code
                </label>
                <input
                  type="text"
                  required
                  name="processCode"
                  id="processCode"
                  value={processCode}
                  onChange={(e) => setProcessCode(e.target.value)}
                  placeholder="Enter process code"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              {/* Customer Name (Dropdown) */}
              <div className="flex-grow justify-center">
                <label
                  htmlFor="customerName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Customer Name
                </label>
                <select
                  name="customerName"
                  required
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select Customer</option>
                  <option value="Customer A">Customer A</option>
                  <option value="Customer B">Customer B</option>
                  <option value="Customer C">Customer C</option>
                </select>
              </div>
            </div>

            {/* Add another "Check" button at the end */}
            <div className="flex w-full justify-center mt-5">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
              >
                <span>Check</span>

                <svg
                  className="w-5 h-5 ml-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>

            {/* Check Status */}
            {checkStatus && (
              <div className="mb-5 text-center text-base font-medium">
                <span
                  className={`${
                    checkStatus === "Pass" ? "text-green-500" : "text-red-600"
                  }`}
                >
                  Status: Hydro Test {checkStatus}
                </span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 text-center text-base font-medium text-red-600">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>

      <div>
        {ishydropass && htmfData.length > 0 && (
          <div className="relative overflow-x-auto m-5 bg-white shadow-lg rounded-lg">
            <table className="w-full text-sm text-left text-gray-800">
              <thead className="text-xs text-white uppercase bg-blue-600">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    PARAMETER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SPECIFICATION
                  </th>
                  <th scope="col" className="px-6 py-3">
                    METHOD OF INSPECTION
                  </th>
                  <th scope="col" className="px-6 py-3">
                    OBSERVATION
                  </th>
                  <th scope="col" className="px-6 py-3">
                    REMARKS
                  </th>
                </tr>
              </thead>
              <tbody>
                {htmfData.map((item, index) => (
                  <tr
                    key={index}
                    className={`bg-white border-b transition-colors duration-200 ${
                      index % 2 === 0
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap"
                    >
                      {item.parameter}
                    </th>
                    <td className="px-6 py-4">{item.specification}</td>
                    <td className="px-6 py-4">{item.method}</td>
                    <td className="px-6 py-4">
                      <div className="grid grid-cols-5 gap-4">
                        {Array.from({ length: 1 }, (_, i) => (
                          <input
                            key={i}
                            type="text"
                            placeholder={`Observation ${i + 1}`}
                            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 w-96"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="Remarks"
                        className="border border-gray-300 rounded px-2 py-1 w-64 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Pdi;
