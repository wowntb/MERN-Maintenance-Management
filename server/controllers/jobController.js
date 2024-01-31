const Job = require("../models/job");

// Controller functions for CRUD operations.
module.exports = {
  createJob: async (req, res) => {
    try {
      const job = await Job.create(req.body);
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getJobs: async (req, res) => {
    try {
      const jobs = await Job.find().sort({ status: 1, createdAt: -1 });
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateJob: async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(job);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  batchUpdateStatus: async (req, res) => {
    try {
      const { jobs, status } = req.body;
      console.log(jobs);
      // Update all jobs in batch with the provided status.
      await Job.updateMany(
        { _id: { $in: jobs } },
        { $set: { status: status } }
      );

      res.json({ message: "Status updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
