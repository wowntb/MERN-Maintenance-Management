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

  archiveJob: async (req, res) => {
    try {
      // Find the job by ID and update its "archive" field to true.
      const job = await Job.findByIdAndUpdate(
        req.params.id,
        { $set: { archived: true } },
        { new: true }
      );

      if (!job) {
        // If job is not found, return 404 Not Found.
        return res.status(404).json({ error: "Job not found" });
      }

      // If the job is successfully updated, return the updated job.
      res.json(job);
    } catch (error) {
      console.error("Error archiving job:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getArchives: async (req, res) => {
    try {
      // Find documents with archived: true condition.
      const archivedJobs = await Job.find({ archived: true });

      // Send the found documents as a response.
      res.json(archivedJobs);
    } catch (error) {
      console.error("Error fetching archived documents:", error);
      // Send an error response if there's an error.
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
