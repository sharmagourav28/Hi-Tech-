const PDFDocument = require("pdfkit");
const fs = require("fs");
const Hydro = require("../models/Hydro");
const RecordHydro = require("../models/RecordHydro");
const Welder = require("../models/Welder"); // Import the Welder model

// Save hydro test data
exports.saveHydroData = async (req, res) => {
  
  try {
		const hydroData = new Hydro(req.body);
		const t = await hydroData.save();
    console.log(t)
		res.status(201).json({ message: 'Data saved successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error saving dataa', error });
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

exports.getHydroTests = async (req, res) => {
  try {
    const hydroTests = await RecordHydro.find();
    res.status(200).json(hydroTests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hydro test records" });
  }
};

// Create a new hydro test record
exports.createHydroTest = async (req, res) => {
  const {
    htmfNo,
    customerPartNo,
    type,
    capacityVolume,
    pressureBar,
    shellThickness,
    capThickness,
    flangeThickness,
    materialGrade,
    selectedParameters,
  } = req.body;
console.log(req.body)
  // Validation: Check for missing fields
  if (
    !htmfNo ||
    !customerPartNo ||
    !type ||
    !capacityVolume ||
    !pressureBar ||
    !shellThickness ||
    !capThickness ||
    !flangeThickness ||
    !materialGrade
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTest = new RecordHydro({
      htmfNo,
      customerPartNo,
      type,
      capacityVolume,
      pressureBar,
      shellThickness,
      capThickness,
      flangeThickness,
      materialGrade,
      selectedParameters,
    });

    await newTest.save();
    res.status(201).json({ message: "Hydro Test record created successfully" });
  } catch (error) {
    console.error("Error creating hydro test record:", error);
    res.status(500).json({
      message: "Error creating hydro test record",
      error: error.message,
    });
  }
};

// Delete a hydro test record
exports.deleteHydroTest = async (req, res) => {
  const { id } = req.params;

  try {
    const hydroTest = await RecordHydro.findByIdAndDelete(id);
    if (!hydroTest) {
      return res.status(404).json({ message: "Hydro test record not found" });
    }
    res.status(200).json({ message: "Hydro test record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hydro test record" });
  }
};

// Save welder data
exports.saveWelderData = async (req, res) => {
  try {
    const welderData = new Welder(req.body);
    await welderData.save();
    res.status(201).json({ message: "Welder data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving welder data", error });
  }
};

// Fetch all welder data
exports.getAllWelders = async (req, res) => {
  try {
    const welders = await Welder.find();
    res.status(200).json(welders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving welders", error });
  }
};

// Update welder data by ID
exports.deleteWelderById = async (req, res) => {
  const { id } = req.params;

  try {
    const welder = await Welder.findByIdAndDelete(id);
    if (!welder) {
      return res.status(404).json({ message: "Welder not found" });
    }
    res.status(200).json({ message: "Welder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting welder", error });
  }
};
