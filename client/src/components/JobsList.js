import React, { useState } from "react";

function JobsList({ jobs }) {
  const [updateJob, setUpdateJob] = useState({
    id: "",
    description: "",
    location: "",
    priority: "",
    status: "",
  });
  const [updateJobId, setUpdateJobId] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [batchStatus, setBatchStatus] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleUpdateInputChange = (e, id) => {
    const { name, value } = e.target;
    setUpdateJob({ ...updateJob, id, [name]: value });
  };

  const handleUpdateJob = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateJob),
      });
      if (!response.ok) {
        throw new Error("Failed to update job");
      }
      setUpdateJob({
        id: "",
        description: "",
        location: "",
        priority: "",
        status: "",
      });
      setUpdateJobId(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleToggleUpdateForm = (id) => {
    setUpdateJobId(updateJobId === id ? null : id);
    if (updateJobId !== id) {
      const jobToUpdate = jobs.find((job) => job._id === id);
      setUpdateJob({ ...jobToUpdate });
    }
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const handleShowAll = () => {
    setFilterStatus(null);
  };

  const handleBatchUpdate = async () => {
    try {
      const response = await fetch("/api/jobs/batch", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobs: selectedJobs, status: batchStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update jobs in batch");
      }
      setBatchStatus("");
      setSelectedJobs([]);
    } catch (error) {
      console.error("Error updating jobs in batch:", error);
    }
  };

  const handleCheckboxChange = (e, jobId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(
        selectedJobs.filter((selectedJob) => selectedJob._id !== jobId)
      );
    }

    console.log(selectedJobs);
  };

  const filteredJobs = filterStatus
    ? jobs.filter((job) => job.status === filterStatus)
    : jobs;

  return (
    <>
      <h2>Jobs List</h2>
      <div>
        <button onClick={() => handleFilterStatus("Submitted")}>
          Show Submitted
        </button>
        <button onClick={() => handleFilterStatus("In progress")}>
          Show In Progress
        </button>
        <button onClick={() => handleFilterStatus("Completed")}>
          Show Completed
        </button>
        <button onClick={() => handleFilterStatus("Archived")}>
          Show Archived
        </button>
        <button onClick={handleShowAll}>Show All</button>
      </div>

      <div>
        <select
          value={batchStatus}
          onChange={(e) => setBatchStatus(e.target.value)}
        >
          <option value="">Select Status for Batch Update</option>
          <option value="Submitted">Submitted</option>
          <option value="In progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
        <button onClick={handleBatchUpdate}>Batch Update</button>
      </div>

      <ul>
        {filteredJobs.map((job) => (
          <li key={job._id}>
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(e, job._id)}
            />
            <strong>Description:</strong> {job.description}
            <br />
            <strong>Location:</strong> {job.location}
            <br />
            <strong>Priority:</strong> {job.priority}
            <br />
            <strong>Status:</strong> {job.status}
            <br />
            <button onClick={() => handleToggleUpdateForm(job._id)}>
              Update
            </button>
            {updateJobId === job._id && (
              <div>
                <input
                  type="text"
                  name="description"
                  value={updateJob.description}
                  onChange={(e) => handleUpdateInputChange(e, job._id)}
                  placeholder="New Description"
                />
                <input
                  type="text"
                  name="location"
                  value={updateJob.location}
                  onChange={(e) => handleUpdateInputChange(e, job._id)}
                  placeholder="New Location"
                />
                <select
                  name="priority"
                  value={updateJob.priority}
                  onChange={(e) => handleUpdateInputChange(e, job._id)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <select
                  name="status"
                  value={updateJob.status}
                  onChange={(e) => handleUpdateInputChange(e, job._id)}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="In progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
                <button onClick={() => handleUpdateJob(job._id)}>Save</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default JobsList;
