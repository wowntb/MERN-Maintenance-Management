const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  priority: { type: String, required: true },
  status: {
    type: String,
    enum: ["submitted", "in progress", "completed"],
    default: "submitted",
  },
  creation_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
