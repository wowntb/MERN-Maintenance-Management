const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.put("/update/status", jobController.batchUpdateStatus);
router.put("/archive/:id", jobController.archiveJob);

module.exports = router;
