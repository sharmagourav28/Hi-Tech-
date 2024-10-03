const express = require("express");
const {
  saveHydroData,
  getAllHydroData,
  getHydroCertificate,
} = require("../controllers/hydrocontroller");

const router = express.Router();

router.post("/submit", saveHydroData); // Save hydro test data
router.get("/all", getAllHydroData); // Fetch all hydro test data
router.get("/certificate/:id", getHydroCertificate); // Get certificate by ID

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
    console.error("Error checking serial number:", error); // Log error for debugging
    res
      .status(500)
      .json({ message: "Error checking serial number", error: error.message });
  }
});

module.exports = router;
