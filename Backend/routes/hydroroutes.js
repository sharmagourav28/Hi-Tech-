const express = require("express");
const {
  saveHydroData,
  getAllHydroData,
  getHydroCertificate,
} = require("../controllers/hydrocontroller");

// Import the Hydro model to query data
const Hydro = require("../models/Hydro"); // Adjust the path as necessary

const router = express.Router();

// Route to save hydro test data
router.post("/submit", saveHydroData);

// Route to fetch all hydro test data
router.get("/all", getAllHydroData);

// Route to get certificate by ID
router.get("/certificate/:id", getHydroCertificate);

// New route to check serial number
router.get("/check/:serialNumber", async (req, res) => {
  try {
    const { serialNumber } = req.params; // Get serialNumber from URL params
    const hydroData = await Hydro.findOne({ serialNumber }); // Query the database by serial number

    if (!hydroData) {
      // Return a 404 error if the record is not found
      return res.status(404).json({ message: "Record not found" });
    }

    // Return passFail status if the record is found
    res.status(200).json({ result: hydroData.passFail });
  } catch (error) {
    // Catch any errors and log them, returning a 500 status
    console.error("Error checking serial number:", error);
    res
      .status(500)
      .json({ message: "Error checking serial number", error: error.message });
  }
});

module.exports = router;
