import React, { useState } from "react";
import axios from "axios";

const RecordHydro = () => {
  const [formData, setFormData] = useState({
    htmfNo: "",
    customerPartNo: "",
    type: "",
    capacityVolume: "",
    pressureBar: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData); // Debugging line
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hydro/tests",
        formData
      );

      alert("Hydro Test record saved successfully!");
    } catch (error) {
      console.error("Error saving hydro test record:", error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || "Unknown error occurred"}`
        );
      } else {
        alert("Error sending data to the server");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Record Hydro Test</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block mb-2">HTMF NO:</label>
          <input
            type="text"
            name="htmfNo"
            value={formData.htmfNo}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Customer PART NO:</label>
          <input
            type="text"
            name="customerPartNo"
            value={formData.customerPartNo}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Capacity Volume:</label>
          <input
            type="text"
            name="capacityVolume"
            value={formData.capacityVolume}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Pressure BAR:</label>
          <input
            type="text"
            name="pressureBar"
            value={formData.pressureBar}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecordHydro;
