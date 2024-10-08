const mongoose = require("mongoose");

const hydroTestSchema = new mongoose.Schema({
  htmfNo: { type: String, required: true },
  customerPartNo: { type: String, required: true },
  type: { type: String, required: true },
  capacityVolume: { type: String, required: true },
  pressureBar: { type: String, required: true },
  shellThickness: { type: String, required: true }, // New field
  capThickness: { type: String, required: true }, // New field
  flangeThickness: { type: String, required: true }, // New field
  materialGrade: { type: String, required: true }, // New field
  createdAt: { type: Date, default: Date.now },
  selectedParameters: {
    type: [{
        parameter: { type: String },
        specification: { type: String },
        method: { type: String },
    }],
    required: true,
},});

module.exports = mongoose.model("HydroTest", hydroTestSchema);
