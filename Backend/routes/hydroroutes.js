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

module.exports = router;
