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
  const [type, setType] = useState("");
  const [capacityVolume, setCapacityVolume] = useState("");
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
  const [shellThickness, setShellThickness] = useState("");
  const [capThickness, setCapThickness] = useState("");
  const [flangeThickness, setFlangeThickness] = useState("");
  const [materialGrade, setMaterialGrade] = useState("");

  const handlePassFailChange = (e) => {
    setPassFail(e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.rect(10, 10, 400, 277, "S");

    doc.setFillColor(240, 240, 240);
    doc.rect(10, 10, 400, 277, "F");

    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("HYDROSTATIC TEST CERTIFICATE", 210, 40, null, null, "center");

    const logoImg = "data:image/jpeg;base64,..."; // Replace with actual image URL/base64
    doc.addImage(logoImg, "JPEG", 30, 20, 70, 40);

    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);

    const formData = [
      { label: "Test Date", value: testDate },
      { label: "HTMF Part Number", value: htmfPartNumber },
      { label: "Customer Part Number", value: customerPartNumber },
      { label: "Type", value: type },
      { label: "Capacity/Volume", value: capacityVolume },
      { label: "Serial Number", value: serialNumber },
      { label: "Hydro Pressure (Bar)", value: hydroPressure },
      { label: "Test Start Time", value: `${startTime} ${startAmPm}` },
      { label: "Test End Time", value: `${endTime} ${endAmPm}` },
      { label: "Welder Code", value: welderCode },
      { label: "Operator Code", value: operator },
      { label: "Witness Code", value: witnessBay },
      { label: "Result", value: passFail },
      { label: "Shell Thickness", value: shellThickness },
      { label: "Cap Thickness", value: capThickness },
      { label: "Flange Thickness", value: flangeThickness },
      { label: "Material Grade", value: materialGrade },
    ];

    const tableData = formData.map(({ label, value }) => [label, value]);

    doc.autoTable({
      startY: 70,
      head: [["Field", "Details"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 14,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: 255,
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 10 },
    });

    const finalY = doc.autoTable.previous.finalY || 0;
    const signatureYPosition = finalY + 20;

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

    doc.save(`Hydrostatic_Test_Certificate_${serialNumber}.pdf`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      testDate,
      htmfPartNumber,
      customerPartNumber,
      type,
      capacityVolume,
      serialNumber,
      hydroPressure,
      startTime: `${startTime} ${startAmPm}`,
      endTime: `${endTime} ${endAmPm}`,
      welderCode,
      operator,
      witnessBay,
      passFail,
      shellThickness,
      capThickness,
      flangeThickness,
      materialGrade,
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
        setType("");
        setCapacityVolume("");
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
        setShellThickness("");
        setCapThickness("");
        setFlangeThickness("");
        setMaterialGrade("");
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

              {/* Type */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Capacity Volume */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Capacity/Volume
                </label>
                <input
                  type="text"
                  value={capacityVolume}
                  onChange={(e) => setCapacityVolume(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Serial Number */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  readOnly
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                />
              </div>

              {/* Hydro Pressure */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Hydro Pressure (Bar)
                </label>
                <input
                  type="text"
                  value={hydroPressure}
                  onChange={(e) => setHydroPressure(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Start Time */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={startAmPm}
                    onChange={(e) => setStartAmPm(e.target.value)}
                    className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* End Time */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={endAmPm}
                    onChange={(e) => setEndAmPm(e.target.value)}
                    className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                <input
                  type="text"
                  value={welderCode}
                  onChange={(e) => setWelderCode(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Operator Code */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Operator Code
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

              {/* Pass/Fail */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Result (Pass/Fail)
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

              {/* Thickness Fields */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Shell Thickness
                  </label>
                  <input
                    type="text"
                    value={shellThickness}
                    onChange={(e) => setShellThickness(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Cap Thickness
                  </label>
                  <input
                    type="text"
                    value={capThickness}
                    onChange={(e) => setCapThickness(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Flange Thickness
                  </label>
                  <input
                    type="text"
                    value={flangeThickness}
                    onChange={(e) => setFlangeThickness(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Material Grade */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Material Grade
                </label>
                <input
                  type="text"
                  value={materialGrade}
                  onChange={(e) => setMaterialGrade(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Generate Certificate
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hydro;
