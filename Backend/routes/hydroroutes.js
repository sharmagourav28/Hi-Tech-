const express = require("express");
const {
  saveHydroData,
  getAllHydroData,
  getHydroCertificate,
  createHydroTest,
  getHydroTests,
  deleteHydroTest,
  saveWelderData,
  getAllWelders,
  deleteWelderById,
} = require("../controllers/hydrocontroller");

const Hydro = require("../models/Hydro");
const HydroTest = require("../models/RecordHydro");

const router = express.Router();

// Route to save hydro test data
router.post("/submit", saveHydroData);

// Route to fetch all hydro test data
router.get("/all", getAllHydroData);

// Route to get certificate by ID
router.get("/certificate/:id", getHydroCertificate);

// POST route to create a new hydro test record
router.post("/tests/", createHydroTest);
router.get("/tests", getHydroTests);
router.delete("/tests/:id", deleteHydroTest);

router.post("/welders", saveWelderData);
router.get("/welders", getAllWelders);
router.delete("/welders/:id", deleteWelderById);
// New route to check serial number
router.get("/check/:serialNumber", async (req, res) => {
  try {
    const { serialNumber } = req.params;
    const hydroData = await Hydro.findOne({ serialNumber });

    if (!hydroData) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ result: hydroData.passFail });
  } catch (error) {
    console.error("Error checking serial number:", error);
    res
      .status(500)
      .json({ message: "Error checking serial number", error: error.message });
  }
});

router.get("/allCustomerPartNumber", async (req, res) => {
  try {
    // Query to get only the customerPartNumber field from all entries
    const results = await HydroTest.find({}, "htmfNo");
    console.log("Customer Part Numbers:", results);
    res.status(200).json(results); // Send the results as a JSON response
  } catch (err) {
    console.error("Error fetching customer part numbers:", err);
    res.status(500).json({ error: "Failed to fetch customer part numbers" });
  }
});

router.get("/ht/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const result = await HydroTest.findById(id); // Fetch the document by ID

    if (result) {
      res.status(200).json(result); // Send back the found document
      console.log(result);
    } else {
      res.status(404).json({ message: "Item not found" }); // Handle not found case
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
});

module.exports = router;
