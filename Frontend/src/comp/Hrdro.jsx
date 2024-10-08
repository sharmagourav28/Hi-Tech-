import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Header from "./Header";
import Footer from "./Footer";
import "jspdf-autotable";
import axios from "axios";

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
  const [savedhtmf, setsavedhtmf] = useState([]);
  const [filteredHTMF, setFilteredHTMF] = useState([]);
  const [isSelected, setIsSelected] = useState(true);
  const [savedWelder, setSavedWelder] = useState([]);

  useEffect(() => {
    const fetchCustomerPartNumbers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/hydro/allhtmfwelder"
        );
        setsavedhtmf(data.allhtmf);
        setSavedWelder(data.allwelder);
        console.log(data.allwelder);
      } catch (error) {
        console.error("Error fetching customer part numbers:", error);
      }
    };

    fetchCustomerPartNumbers();
  }, []);

  const handlePassFailChange = (e) => {
    setPassFail(e.target.value);
  };

  const handleOptionClick = async (data) => {
    setIsSelected(false);
    console.log("Selected Data:", data);

    try {
      const r = await axios.get(
        `http://localhost:5000/api/hydro/ht/${data._id}`
      );
      console.log(r.data.htmfNo);
      setCapThickness(r.data.capThickness);
      setCapacityVolume(r.data.capacityVolume);
      setCustomerPartNumber(r.data.customerPartNo);
      setMaterialGrade(r.data.materialGrade);
      setHydroPressure(r.data.pressureBar);
      setFlangeThickness(r.data.flangeThickness);
      setType(r.data.type);
      setShellThickness(r.data.shellThickness);
      setHtmfPartNumber(r.data.htmfNo);
    } catch (error) {
      console.error("Error fetching data for selected ID:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a3",
    });

    // Title
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("Hi-Tech Metal Forming(I) Indore", 210, 40, null, null, "center");
    doc.text("HYDRO TEST CERTIFICATE", 210, 60, null, null, "center");

    // Logo
    const logoImg = "data:image/jpeg;base64,..."; // Replace with actual image URL/base64
    doc.addImage(logoImg, "JPEG", 30, 20, 70, 40);

    // Vertical line to divide the page into two sections
    doc.setDrawColor(0, 0, 0);
    doc.line(210, 80, 210, 250); // x1, y1, x2, y2

    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);

    // Define form data for the left and right sections
    const leftFormData = [
      { label: "Test Date", value: testDate },
      { label: "HTMF Part Number", value: htmfPartNumber },
      { label: "Customer Part Number", value: customerPartNumber },
      { label: "Type", value: type },
      { label: "Capacity/Volume", value: capacityVolume },
      { label: "Serial Number", value: serialNumber },
      { label: "Hydro Pressure (Bar)", value: hydroPressure },
    ];

    const rightFormData = [
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

    // Left section table
    const leftTableData = leftFormData.map(({ label, value }) => [
      label,
      value,
    ]);
    doc.autoTable({
      startY: 80,
      margin: { left: 20 },
      body: leftTableData,
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
        fillColor: "white", // Set the background color to white or remove to make it transparent
      },
      columnStyles: {
        0: { cellWidth: 80 }, // Field column
        1: { cellWidth: 90 }, // Details column
      },
    });

    // Right section table
    const rightTableData = rightFormData.map(({ label, value }) => [
      label,
      value,
    ]);
    doc.autoTable({
      startY: 80,
      margin: { left: 220 },
      body: rightTableData,
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
        fillColor: "white", // Set the background color to white or remove to make it transparent
      },
      columnStyles: {
        0: { cellWidth: 80 }, // Field column
        1: { cellWidth: 90 }, // Details column
      },
    });

    const finalY = Math.max(doc.autoTable.previous.finalY, 100); // Get the max finalY from both tables
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
      welderCode: "qwqe",
      operator,
      witnessBay,
      passFail,
      shellThickness,
      capThickness,
      flangeThickness,
      materialGrade,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hydro/submit",
        formData
      );

      console.log(response);
      if (response.status == 201) {
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
      <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 shadow-2xl sm:rounded-2xl px-10 py-12 border border-gray-200 rounded-lg mx-auto">
            <h1 className="text-4xl font-extrabold text-center text--600 mb-8 tracking-wide uppercase font-poppins ">
              Hi-Tech Metal Hydro Test
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section: Test Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Test Date */}
                <div>
                  <label
                    htmlFor="testDate"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  "
                  >
                    Test Date
                  </label>

                  <input
                    required
                    type="date"
                    name="testDate"
                    id="testDate"
                    value={testDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Serial Number */}
                <div>
                  <label
                    htmlFor="serialNumber"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider "
                  >
                    Serial Number
                  </label>

                  <input
                    type="text"
                    name="serialNumber"
                    id="serialNumber"
                    value={serialNumber}
                    readOnly
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Section: Part Numbers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* HTMF Part Number */}
                <div className="relative">
                  <label
                    htmlFor="htmfPartNumber"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider "
                  >
                    HTMF Part Number
                  </label>
                  <input
                    required
                    type="text"
                    name="htmfPartNumber"
                    id="htmfPartNumber"
                    value={htmfPartNumber}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase();
                      setHtmfPartNumber(value);
                      const filtered = savedhtmf.filter((item) =>
                        item.htmfNo.toLowerCase().includes(value)
                      );
                      setFilteredHTMF(filtered);
                      setIsSelected(true);
                    }}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    aria-label="HTMF Part Number Input"
                    aria-describedby="filtered-results"
                    autoComplete="off"
                  />
                  {filteredHTMF.length > 0 && isSelected && (
                    <ul
                      id="filtered-results"
                      className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg"
                    >
                      {filteredHTMF.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleOptionClick(item)}
                          className="cursor-pointer p-2 hover:bg-gray-200 focus:bg-gray-300"
                          tabIndex={0}
                          role="option"
                          aria-selected="false"
                        >
                          {item.htmfNo}
                        </li>
                      ))}
                    </ul>
                  )}
                  {filteredHTMF.length === 0 &&
                    isSelected &&
                    htmfPartNumber && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 p-2 text-gray-500 shadow-lg">
                        No results found
                      </div>
                    )}
                </div>

                {/* Customer Part Number */}
                <div>
                  <label
                    htmlFor="customerPartNumber"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  "
                  >
                    Customer Part Number
                  </label>
                  <input
                    required
                    type="text"
                    name="customerPartNumber"
                    id="customerPartNumber"
                    value={customerPartNumber}
                    onChange={(e) => setCustomerPartNumber(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Section: Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  "
                  >
                    Type
                  </label>
                  <input
                    required
                    type="text"
                    name="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Capacity Volume */}
                <div>
                  <label
                    htmlFor="capacityVolume"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  "
                  >
                    Capacity/Volume
                  </label>
                  <input
                    required
                    type="text"
                    name="capacityVolume"
                    id="capacityVolume"
                    value={capacityVolume}
                    onChange={(e) => setCapacityVolume(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Hydro Pressure */}
                <div>
                  <label
                    htmlFor="hydroPressure"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider "
                  >
                    Hydro Pressure (Bar)
                  </label>
                  <input
                    required
                    type="number"
                    name="hydroPressure"
                    id="hydroPressure"
                    value={hydroPressure}
                    onChange={(e) => setHydroPressure(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Section: Test Timing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Time */}
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider "
                  >
                    Start Time
                  </label>
                  <div className="flex space-x-2">
                    <input
                      required
                      type="time"
                      name="startTime"
                      id="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                      name="startAmPm"
                      id="startAmPm"
                      value={startAmPm}
                      onChange={(e) => setStartAmPm(e.target.value)}
                      className="mt-1 p-3 block border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider "
                  >
                    End Time
                  </label>
                  <div className="flex space-x-2">
                    <input
                      required
                      type="time"
                      name="endTime"
                      id="endTime"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                      name="endAmPm"
                      id="endAmPm"
                      value={endAmPm}
                      onChange={(e) => setEndAmPm(e.target.value)}
                      className="mt-1 p-3 block border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {/* Main Heading */}
                  <div className="col-span-2 sm:col-span-4 md:col-span-7 text-center font-bold text-lg py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    WELDER CODE
                  </div>

                  {/* Sub Headings */}
                  <div className="text-center font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    Long Root
                  </div>
                  <div className="text-center font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    Long Final
                  </div>
                  <div className="text-center font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    Round Root
                  </div>
                  <div className="text-center font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    Round Final
                  </div>
                  <div className="text-center font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    Sockets
                  </div>
                  <div className="text-center font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    Attachment
                  </div>
                  <div className="text-center font-semibold py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-500">
                    Rework
                  </div>

                  {/* Dropdowns */}
                  {Array(6)
                    .fill()
                    .map((_, index) => (
                      <div key={index} className="text-center">
                        <select className="border border-gray-300 rounded py-1 px-2 w-full">
                          <option value="">Select</option>
                          {savedWelder.map((option, idx) => (
                            <option key={idx} value={option.welderCode}>
                              {option.welderCode}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}

                  {/* Rework Dropdown with NA option */}
                  <div className="text-center">
                    <select className="border border-gray-300 rounded py-1 px-2 w-full">
                      <option value="">Select</option>
                      {savedWelder.map((option, idx) => (
                        <option key={idx} value={option.welderCode}>
                          {option.welderCode}
                        </option>
                      ))}
                      {/* Add "NA" option */}
                      <option value="NA">NA</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Personnel Codes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Welder Code */}
                <div>
                  <label
                    htmlFor="materialGrade"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider "
                  >
                    Material Grade
                  </label>
                  <input
                    required
                    type="text"
                    name="materialGrade"
                    id="materialGrade"
                    value={materialGrade}
                    onChange={(e) => setMaterialGrade(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Operator Code */}
                <div>
                  <label
                    htmlFor="operator"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  "
                  >
                    Operator Code
                  </label>
                  <input
                    required
                    type="text"
                    name="operator"
                    id="operator"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Witness Bay */}
                <div>
                  <label
                    htmlFor="witnessBay"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  "
                  >
                    Witness Bay
                  </label>
                  <input
                    required
                    type="text"
                    name="witnessBay"
                    id="witnessBay"
                    value={witnessBay}
                    onChange={(e) => setWitnessBay(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Section: Thickness Measurements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Shell Thickness */}

                {/* Cap Thickness */}
                <div>
                  <label className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  ">
                    Shell Thickness
                  </label>
                  <input
                    required
                    type="text"
                    value={shellThickness}
                    onChange={(e) => setShellThickness(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  ">
                    Cap Thickness
                  </label>
                  <input
                    required
                    type="text"
                    value={capThickness}
                    onChange={(e) => setCapThickness(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Flange Thickness */}
                <div>
                  <label className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  ">
                    Flange Thickness
                  </label>
                  <input
                    required
                    type="text"
                    value={flangeThickness}
                    onChange={(e) => setFlangeThickness(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Section: Material Grade & Result */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* Result (Pass/Fail) */}
                <div>
                  <label
                    htmlFor="passFail"
                    className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-indigo-600 tracking-wider  "
                  >
                    Result (Pass/Fail)
                  </label>
                  <select
                    required
                    name="passFail"
                    id="passFail"
                    value={passFail}
                    onChange={handlePassFailChange}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Result</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Generate Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hydro;
