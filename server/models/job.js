const mongoose = require("mongoose");

// Define the schema for the job document.
const jobSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  priority: { type: String, required: true },
  status: {
    type: String,
    default: "submitted",
  },
  creation_date: { type: Date, default: Date.now },
});

// Create a Mongoose model based on the schema.
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
