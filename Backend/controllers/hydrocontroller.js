const PDFDocument = require("pdfkit");
const fs = require("fs");
const Hydro = require("../models/Hydro");

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

    // Apply filtering if filterField and filterValue are provided
    if (filterField && filterValue) {
      query[filterField] = { $regex: filterValue, $options: "i" }; // Case-insensitive filtering
    }

    // Fetch and sort data based on query and sorting options
    const hydroData = await Hydro.find(query).sort({
      [sortField]: sortOrder === "asc" ? 1 : -1,
    });

    res.status(200).json(hydroData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};

exports.getHydroCertificate = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const hydroData = await Hydro.findById(id); // Fetch the record

    if (!hydroData) {
      return res.status(404).json({ message: "Record not found" });
    }

    const doc = new PDFDocument();
    let filePath = `certificates/${hydroData.serialNumber}_certificate.pdf`;

    // Pipe the PDF to a file
    doc.pipe(fs.createWriteStream(filePath));

    // Add content to the PDF
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

    // Respond with the path to the generated PDF
    res.download(filePath, `${hydroData.serialNumber}_certificate.pdf`);
  } catch (error) {
    res.status(500).json({ message: "Error generating certificate", error });
  }
};
