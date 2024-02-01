const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/archives", jobController.getArchives);
router.put("/batch", jobController.batchUpdateStatus);
router.put("/archive/:id", jobController.archiveJob);
router.put("/:id", jobController.updateJob);

module.exports = router;
