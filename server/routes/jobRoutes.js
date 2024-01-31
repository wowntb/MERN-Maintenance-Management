const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.put("/batch", jobController.batchUpdateStatus);
router.put("/:id", jobController.updateJob);

module.exports = router;
