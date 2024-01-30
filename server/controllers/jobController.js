const Job = require("../models/job");

// Controller functions for CRUD operations
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
  getJobById: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (job) {
        res.json(job);
      } else {
        res.status(404).json({ message: "Job not found" });
      }
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
      const { jobIds, status } = req.body;
      await Job.updateMany({ _id: { $in: jobIds } }, { $set: { status } });
      res.json({ message: "Status updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  archiveJob: async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(
        req.params.id,
        { status: "archived" },
        { new: true }
      );
      res.json(job);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
