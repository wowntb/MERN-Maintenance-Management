import { useState } from "react";

function JobsList({ jobs }) {
  // State variables for managing job updates, filters, and batch updates
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

  // Function to handle changes in update input fields
  const handleUpdateInputChange = (e, id) => {
    const { name, value } = e.target;
    setUpdateJob({ ...updateJob, id, [name]: value });
  };

  // Function to handle individual job updates
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

  // Function to handle batch updates
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

  // Function to handle archiving individual jobs
  const handleArchiveJob = async (id) => {
    try {
      const response = await fetch(`/api/jobs/archive/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(id);
      if (!response.ok) {
        throw new Error("Failed to archive job");
      }
    } catch (error) {
      console.error("Error archiving job:", error);
    }
  };

  // Function to toggle update form visibility for individual jobs
  const handleToggleUpdateForm = (id) => {
    setUpdateJobId(updateJobId === id ? null : id);
    if (updateJobId !== id) {
      const jobToUpdate = jobs.find((job) => job._id === id);
      setUpdateJob({ ...jobToUpdate });
    }
  };

  // Function to handle filtering by job status
  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  // Function to show all jobs
  const handleShowAll = () => {
    setFilterStatus(null);
  };

  // Function to handle checkbox changes for batch updates
  const handleCheckboxChange = (e, jobId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(
        selectedJobs.filter((selectedJob) => selectedJob._id !== jobId)
      );
    }
  };

  // Filter jobs based on the "archived" value being false
  const filteredJobs = jobs.filter(
    (job) => !job.archived && (!filterStatus || job.status === filterStatus)
  );

  return (
    <>
      <h2>Jobs List</h2>
      <div>
        {/* Buttons for filtering job statuses */}
        <button onClick={() => handleFilterStatus("Submitted")}>
          Show Submitted
        </button>
        <button onClick={() => handleFilterStatus("In progress")}>
          Show In Progress
        </button>
        <button onClick={() => handleFilterStatus("Completed")}>
          Show Completed
        </button>
        <button onClick={handleShowAll}>Show All</button>
      </div>

      <div>
        {/* Select and button for batch updates */}
        <select
          value={batchStatus}
          onChange={(e) => setBatchStatus(e.target.value)}
        >
          <option value="">Select Status for Batch Update</option>
          <option value="Submitted">Submitted</option>
          <option value="In progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleBatchUpdate}>Batch Update</button>
      </div>

      <ul>
        {/* Mapping over filtered jobs */}
        {filteredJobs.map((job) => (
          <li key={job._id}>
            {/* Checkbox for batch update */}
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
            {/* Displaying archive status */}
            <strong>Archive:</strong> {job.archived ? "Yes" : "No"}
            <br />
            {/* Buttons for update and archive */}
            <button onClick={() => handleToggleUpdateForm(job._id)}>
              Update
            </button>
            <button onClick={() => handleArchiveJob(job._id)}>Archive</button>
            {/* Update form if selected */}
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
