const mongoose = require("mongoose");

const welderSchema = new mongoose.Schema({
  welderName: { type: String, required: true },
  welderCode: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model("Welder", welderSchema);
