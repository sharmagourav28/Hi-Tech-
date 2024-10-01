// const express = require("express");
// const { saveHydroData } = require("../controllers/hydrocontroller");
// const router = express.Router();

// router.post("/submit", saveHydroData);

// module.exports = router;

const express = require("express");
const {
  saveHydroData,
  getAllHydroData,
} = require("../controllers/hydrocontroller");
const router = express.Router();

router.post("/submit", saveHydroData);
router.get("/all", getAllHydroData); // New route to fetch all hydro test data

module.exports = router;
