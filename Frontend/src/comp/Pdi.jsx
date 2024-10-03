import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

// Function to check serial number against the backend
const checkSerialNumber = async (serialNumber) => {
  console.log("Edrr");
  try {
    console.log("Edrr 1");
    const response = await fetch(
      `http://localhost:5000/api/hydro/check/${serialNumber}`
    );

    console.log("Edrr 2");
    if (!response.ok) {
      throw new Error("Not Found");
    }
    console.log("Edrr 3");
    const data = await response.json();
    return data.result; // Return the status from the response
  } catch (error) {
    console.error("Error checking serial number:", error);
    return null; // Return null in case of error
  }
};

const Pdi = () => {
  const [testDate, setTestDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0]; // Default to current date
    return today;
  });
  const [remark, setRemark] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [checkStatus, setCheckStatus] = useState(""); // State to hold check result
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Check if the generate certificate button should be enabled
  const isButtonEnabled = serialNumber.length === 12 && checkStatus === "Pass";

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to generate certificate or any further processing
    console.log({
      testDate,
      remark,
      serialNumber,
    });
    alert("Certificate Generated!");
  };

  // Handle check button click
  const handleCheck = async () => {
    setErrorMessage(""); // Clear any previous error messages
    const status = await checkSerialNumber(serialNumber);
    if (status) {
      setCheckStatus(status); // Update check status
    } else {
      setCheckStatus("Not Found");
      setErrorMessage("Serial number not found. Please check again.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center p-12 mt-20">
        <div className="mx-auto w-full max-w-[550px] mt-12">
          {/* Heading for the form */}
          <h2 className="mb-6 text-center text-2xl font-bold text-[#07074D]">
            PDI Test
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Test Date */}
            <div className="mb-5">
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
              />
            </div>

            {/* Serial Number */}
            <div className="mb-5 relative">
              <label
                htmlFor="serialNumber"
                className="mb-2 block text-base font-medium text-[#07074D]"
              >
                Serial Number (12 Digits)
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="serialNumber"
                  id="serialNumber"
                  value={serialNumber}
                  onChange={(e) =>
                    setSerialNumber(e.target.value.toUpperCase())
                  } // Convert to uppercase
                  maxLength={12} // Set max length to 12
                  pattern="^[A-Z0-9]{12}$" // Restrict to exactly 12 uppercase letters/numbers
                  required // Make this field required
                  className="flex-grow rounded-l-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <button
                  type="button"
                  onClick={handleCheck}
                  className="rounded-r-md bg-[#6A64F1] py-3 px-6 text-base font-semibold text-white hover:bg-[#5A54D1] focus:outline-none focus:ring-2 focus:ring-[#6A64F1] focus:ring-opacity-50"
                >
                  Check
                </button>
              </div>
            </div>

            {/* Check Status */}
            {checkStatus && (
              <div className="mb-5 text-center text-base font-medium text-[#07074D]">
                Status: {checkStatus}
              </div>
            )}
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 text-center text-base font-medium text-red-600">
                {errorMessage}
              </div>
            )}

            {/* Remark */}
            <div className="mb-5">
              <label
                htmlFor="remark"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Remarks
              </label>
              <textarea
                name="remark"
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Add any remarks"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Generate Certificate Button */}
            <div>
              <button
                type="submit"
                className={`hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none ${
                  isButtonEnabled ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isButtonEnabled} // Disable button if conditions aren't met
              >
                Generate Certificate
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pdi;
