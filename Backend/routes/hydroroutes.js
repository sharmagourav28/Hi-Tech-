const express = require("express");
const {
  saveHydroData,
  getAllHydroData,
  getHydroCertificate,
  createHydroTest,
  getHydroTests,
  deleteHydroTest,
} = require("../controllers/hydroController");

const Hydro = require("../models/Hydro");

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

module.exports = router;
