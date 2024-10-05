import React, { useState } from "react";
import jsPDF from "jspdf";
import Header from "./Header";
import Footer from "./Footer";

import "jspdf-autotable";
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
      orientation: "landscape", // Keep landscape for wider pages
      unit: "mm",
      format: "a3", // Change to A3 format
    });

    // Custom styling: Borders, color, and font sizes
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.rect(10, 10, 400, 277, "S"); // Adjust dimensions to fit A3 size

    // Adding a background color (optional)
    doc.setFillColor(240, 240, 240); // Light gray
    doc.rect(10, 10, 400, 277, "F"); // Adjust dimensions for background

    // Title of Certificate
    doc.setFontSize(26); // Increase font size for A3
    doc.setFont("helvetica", "bold");
    doc.text("HYDROSTATIC TEST CERTIFICATE", 210, 40, null, null, "center"); // Adjust Y-position

    // Logo (if you have an image URL or base64 encoded image)
    const logoImg = "data:image/jpeg;base64,..."; // Replace with actual image URL/base64
    doc.addImage(logoImg, "JPEG", 30, 20, 70, 40); // Adjust logo position and size for A3

    // Add form data content in a table format
    doc.setFontSize(16); // Increase font size slightly for larger paper
    doc.setTextColor(50, 50, 50);

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

    // Set up table structure
    const tableData = formData.map(({ label, value }) => [label, value]);

    doc.autoTable({
      startY: 70, // Adjust starting Y-position for A3
      head: [["Field", "Details"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 14, // Adjust font size for readability on A3
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [0, 102, 204], // Blue header color
        textColor: 255,
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Light gray for data rows
      },
      margin: { top: 10 },
    });

    // Add a footer with signature lines
    // After rendering the table
    const finalY = doc.autoTable.previous.finalY || 0; // Get the position where the table ends
    const signatureYPosition = finalY + 20; // Add some space below the table

    doc.setFontSize(14);
    doc.text(
      "Authorized Signature: ____________________",
      30,
      signatureYPosition
    );
    doc.text(
      "Inspector's Signature: ____________________",
      250,
      signatureYPosition
    );

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
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 mt-20">
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
