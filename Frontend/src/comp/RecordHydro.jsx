import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa"; // Importing trash icon from react-icons

const RecordHydro = () => {
  const [formData, setFormData] = useState({
    htmfNo: "",
    customerPartNo: "",
    type: "",
    capacityVolume: "",
    pressureBar: "",
    shellThickness: "", // New field
    capThickness: "", // New field
    flangeThickness: "", // New field
    materialGrade: "", // New field
  });

  const [hydroTests, setHydroTests] = useState([]);

  // Fetch hydro test records from the server
  const fetchHydroTests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hydro/tests");
      setHydroTests(response.data);
    } catch (error) {
      console.error("Error fetching hydro test records:", error);
    }
  };

  useEffect(() => {
    fetchHydroTests();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData); // Debugging line
    try {
      await axios.post("http://localhost:5000/api/hydro/tests", formData);

      // Show success notification
      toast.success("Hydro Test record saved successfully!");

      // Clear the form
      setFormData({
        htmfNo: "",
        customerPartNo: "",
        type: "",
        capacityVolume: "",
        pressureBar: "",
        shellThickness: "", // Clear new fields
        capThickness: "", // Clear new fields
        flangeThickness: "", // Clear new fields
        materialGrade: "", // Clear new fields
      });

      // Fetch updated hydro test records
      fetchHydroTests();
    } catch (error) {
      console.error("Error saving hydro test record:", error);
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || "Unknown error occurred"}`
        );
      } else {
        toast.error("Error sending data to the server");
      }
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/api/hydro/tests/${id}`);
      toast.success("Hydro Test record deleted successfully!");
      fetchHydroTests(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting hydro test record:", error);
      toast.error("Error deleting the record");
    }
  };

  return (
    <div className="flex p-6 bg-gray-100 min-h-screen">
      <div className="w-2/3 pr-4">
        <h2 className="text-xl font-bold mb-4">Hydro Test Records</h2>
        <div>
          <table className="min-w-full border border-gray-300 overflow-hidden max-w-full">
            <thead>
              <tr>
                <th className="py-2 px-2 border-b">S.No</th>
                <th className="py-2 px-2 border-b">HTMF NO</th>
                <th className="py-2 px-2 border-b">Customer PART NO</th>
                <th className="py-2 px-2 border-b">Type</th>
                <th className="py-2 px-2 border-b">Capacity Volume</th>
                <th className="py-2 px-2 border-b">Pressure BAR</th>
                <th className="py-2 px-2 border-b">Shell Thickness</th>
                <th className="py-2 px-2 border-b">Cap Thickness</th>
                <th className="py-2 px-2 border-b">Flange Thickness</th>
                <th className="py-2 px-2 border-b">Material Grade</th>
                <th className="py-2 px-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hydroTests.map((test, index) => (
                <tr key={test._id}>
                  <td className="py-2 px-2 border-b">{index + 1}</td>
                  <td className="py-2 px-2 border-b">{test.htmfNo}</td>
                  <td className="py-2 px-2 border-b">{test.customerPartNo}</td>
                  <td className="py-2 px-2 border-b">{test.type}</td>
                  <td className="py-2 px-2 border-b">{test.capacityVolume}</td>
                  <td className="py-2 px-2 border-b">{test.pressureBar}</td>
                  <td className="py-2 px-2 border-b">{test.shellThickness}</td>
                  <td className="py-2 px-2 border-b">{test.capThickness}</td>
                  <td className="py-2 px-2 border-b">{test.flangeThickness}</td>
                  <td className="py-2 px-2 border-b">{test.materialGrade}</td>
                  <td className="py-2 px-2 border-b">
                    <button
                      onClick={() => handleDelete(test._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/3 pl-4">
        <h2 className="text-xl font-bold mb-4">Record Hydro Test</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
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
          {/* New Fields */}
          <div className="mb-4">
            <label className="block mb-2">Shell Thickness:</label>
            <input
              type="text"
              name="shellThickness"
              value={formData.shellThickness}
              onChange={handleChange}
              className="w-full border px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Cap Thickness:</label>
            <input
              type="text"
              name="capThickness"
              value={formData.capThickness}
              onChange={handleChange}
              className="w-full border px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Flange Thickness:</label>
            <input
              type="text"
              name="flangeThickness"
              value={formData.flangeThickness}
              onChange={handleChange}
              className="w-full border px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Material Grade:</label>
            <input
              type="text"
              name="materialGrade"
              value={formData.materialGrade}
              onChange={handleChange}
              className="w-full border px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecordHydro;
