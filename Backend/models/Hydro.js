const mongoose = require("mongoose");

const HydroSchema = new mongoose.Schema({
  testDate: { type: String, required: true },
  htmfPartNumber: { type: String, required: true },
  customerPartNumber: { type: String, required: true },
  serialNumber: { type: String, required: true },
  hydroPressure: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  welderCode: { type: String, required: true },
  operator: { type: String, required: true },
  witnessBay: { type: String, required: true },
  passFail: { type: String, required: true },
});

module.exports = mongoose.model("Hydro", HydroSchema);
