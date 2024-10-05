const mongoose = require("mongoose");

const hydroTestSchema = new mongoose.Schema({
  htmfNo: { type: String, required: true },
  customerPartNo: { type: String, required: true },
  type: { type: String, required: true },
  capacityVolume: { type: String, required: true },
  pressureBar: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HydroTest", hydroTestSchema);
