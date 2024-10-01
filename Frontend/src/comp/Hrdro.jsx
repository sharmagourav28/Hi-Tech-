import React, { useState } from "react";
import jsPDF from "jspdf";
import Header from "./Header";
import Footer from "./Footer";

const Hydro = () => {
  const [testDate, setTestDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [htmfPartNumber, setHtmfPartNumber] = useState("");
  const [customerPartNumber, setCustomerPartNumber] = useState("");
  const [serialNumber, setSerialNumber] = useState(() => {
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
    return `SN${today}${Math.floor(1000 + Math.random() * 9000)}`;
  });
  const [hydroPressure, setHydroPressure] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startAmPm, setStartAmPm] = useState("AM");
  const [endAmPm, setEndAmPm] = useState("AM");
  const [welderCode, setWelderCode] = useState("");
  const [operator, setOperator] = useState("");
  const [witnessBay, setWitnessBay] = useState("");
  const [passFail, setPassFail] = useState("");

  const handlePassFailChange = (e) => {
    setPassFail(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape", // Landscape for A3
      unit: "mm",
      format: "a3",
    });

    // Add content to PDF
    doc.setFontSize(16);
    doc.text("Hydrostatic Test Certificate", 150, 20, null, null, "center");

    // Form data content
    doc.setFontSize(12);
    const formData = [
      { label: "Test Date", value: testDate },
      { label: "HTMF Part Number", value: htmfPartNumber },
      { label: "Customer Part Number", value: customerPartNumber },
      { label: "Serial Number", value: serialNumber },
      { label: "Hydro Pressure (Bar)", value: hydroPressure },
      { label: "Test Start Time", value: `${startTime} ${startAmPm}` },
      { label: "Test End Time", value: `${endTime} ${endAmPm}` },
      { label: "Welder Code", value: welderCode },
      { label: "Operator", value: operator },
      { label: "Witness Bay", value: witnessBay },
      { label: "Result", value: passFail },
    ];

    let yPosition = 40;

    formData.forEach(({ label, value }) => {
      doc.text(`${label}: ${value}`, 20, yPosition);
      yPosition += 10;
    });

    // Save the PDF
    doc.save(`Hydrostatic_Test_Certificate_${serialNumber}.pdf`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      testDate,
      htmfPartNumber,
      customerPartNumber,
      serialNumber,
      hydroPressure,
      startTime: `${startTime} ${startAmPm}`,
      endTime: `${endTime} ${endAmPm}`,
      welderCode,
      operator,
      witnessBay,
      passFail,
    };

    try {
      const response = await fetch("http://localhost:5000/api/hydro/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        generatePDF();

        // Reset form fields
        setTestDate(new Date().toISOString().split("T")[0]);
        setHtmfPartNumber("");
        setCustomerPartNumber("");
        setSerialNumber(
          `SN${new Date()
            .toISOString()
            .split("T")[0]
            .replace(/-/g, "")}${Math.floor(1000 + Math.random() * 9000)}`
        );
        setHydroPressure("");
        setStartTime("");
        setEndTime("");
        setStartAmPm("AM");
        setEndAmPm("AM");
        setWelderCode("");
        setOperator("");
        setWitnessBay("");
        setPassFail("");
      } else {
        alert("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="bg-white shadow-lg sm:rounded-lg px-10 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              Hydro Test Form
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Test Date */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Test Date
                </label>
                <input
                  type="date"
                  name="testDate"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* HTMF Part Number */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  HTMF Internal Part Number
                </label>
                <select
                  value={htmfPartNumber}
                  onChange={(e) => setHtmfPartNumber(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Part Number</option>
                  <option value="PN001">PN001</option>
                  <option value="PN002">PN002</option>
                  <option value="PN003">PN003</option>
                </select>
              </div>

              {/* Customer Part Number */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Customer Part Number
                </label>
                <input
                  type="text"
                  value={customerPartNumber}
                  onChange={(e) => setCustomerPartNumber(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Serial Number */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Serial Number (Auto Generated)
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-300 bg-gray-100 rounded-md focus:outline-none"
                />
              </div>

              {/* Hydro Pressure */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Hydro Pressure (Bar)
                </label>
                <input
                  type="number"
                  value={hydroPressure}
                  onChange={(e) => setHydroPressure(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Start and End Time */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Dropdown for AM/PM */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start AM/PM
                  </label>
                  <select
                    value={startAmPm}
                    onChange={(e) => setStartAmPm(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End AM/PM
                  </label>
                  <select
                    value={endAmPm}
                    onChange={(e) => setEndAmPm(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Welder Code */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Welder Code
                </label>
                <select
                  value={welderCode}
                  onChange={(e) => setWelderCode(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Welder Code</option>
                  <option value="W001">W001</option>
                  <option value="W002">W002</option>
                  <option value="W003">W003</option>
                </select>
              </div>

              {/* Operator */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Operator
                </label>
                <input
                  type="text"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Witness Bay */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Witness Bay
                </label>
                <input
                  type="text"
                  value={witnessBay}
                  onChange={(e) => setWitnessBay(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Pass or Fail */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Result (Pass or Fail)
                </label>
                <select
                  value={passFail}
                  onChange={handlePassFailChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Result</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>

              {/* Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!passFail} // Button is disabled until Pass or Fail is selected
                  className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    passFail === "Fail"
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                  } text-white`}
                >
                  {passFail === "Fail" ? "Review Test" : "Generate Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hydro;
