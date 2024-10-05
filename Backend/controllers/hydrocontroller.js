const PDFDocument = require("pdfkit");
const fs = require("fs");
const Hydro = require("../models/Hydro");
const RecordHydro = require("../models/RecordHydro");

// Save hydro test data
exports.saveHydroData = async (req, res) => {
  try {
    const hydroData = new Hydro(req.body);
    await hydroData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
};

// Fetch all hydro test data
exports.getAllHydroData = async (req, res) => {
  try {
    const {
      sortField = "testDate",
      sortOrder = "asc",
      filterField,
      filterValue,
    } = req.query;

    let query = {};
    if (filterField && filterValue) {
      query[filterField] = { $regex: filterValue, $options: "i" }; // Case-insensitive filtering
    }

    const hydroData = await Hydro.find(query).sort({
      [sortField]: sortOrder === "asc" ? 1 : -1,
    });
    res.status(200).json(hydroData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};

// Generate and download PDF certificate
exports.getHydroCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const hydroData = await Hydro.findById(id);

    if (!hydroData) {
      return res.status(404).json({ message: "Record not found" });
    }

    const doc = new PDFDocument();
    let filePath = `certificates/${hydroData.serialNumber}_certificate.pdf`;

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(25).text("Hydro Test Certificate", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Test Date: ${hydroData.testDate}`);
    doc.text(`HTMF Part Number: ${hydroData.htmfPartNumber}`);
    doc.text(`Customer Part Number: ${hydroData.customerPartNumber}`);
    doc.text(`Serial Number: ${hydroData.serialNumber}`);
    doc.text(`Hydro Pressure: ${hydroData.hydroPressure}`);
    doc.text(`Start Time: ${hydroData.startTime}`);
    doc.text(`End Time: ${hydroData.endTime}`);
    doc.text(`Welder Code: ${hydroData.welderCode}`);
    doc.text(`Operator: ${hydroData.operator}`);
    doc.text(`Witness Bay: ${hydroData.witnessBay}`);
    doc.text(`Result: ${hydroData.passFail}`);

    doc.end();

    // Download the file
    res.download(filePath, `${hydroData.serialNumber}_certificate.pdf`);
  } catch (error) {
    res.status(500).json({ message: "Error generating certificate", error });
  }
};

// Hydro data record from admin
exports.createHydroTest = async (req, res) => {
  const { htmfNo, customerPartNo, type, capacityVolume, pressureBar } =
    req.body;

  try {
    const newRecord = new RecordHydro({
      htmfNo,
      customerPartNo,
      type,
      capacityVolume,
      pressureBar,
    });

    await newRecord.save();
    res.status(201).json({ message: "Hydro Test record saved successfully!" });
  } catch (error) {
    console.error("Error saving Hydro Test record:", error);
    res.status(500).json({ error: "Failed to save Hydro Test record" });
  }
};

// Get all hydro test records
exports.getHydroTests = async (req, res) => {
  try {
    const records = await RecordHydro.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching Hydro Test records:", error);
    res.status(500).json({ error: "Failed to fetch Hydro Test records" });
  }
};
