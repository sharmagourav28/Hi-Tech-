const { getHydroCertificate } = require("../controllers/hydrocontroller");

router.get("/certificate/:id", getHydroCertificate); // New route for getting certificate
