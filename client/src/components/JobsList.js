import { useState } from "react";

function JobsList({ jobs }) {
  // State for managing the update job form inputs and selected job ID.
  const [updateJob, setUpdateJob] = useState({
    id: "",
    description: "",
    location: "",
    priority: "",
    status: "",
  });
  const [updateJobId, setUpdateJobId] = useState(null);

  // State for filtering jobs based on status.
  const [filterStatus, setFilterStatus] = useState(null);

  // Function to handle input changes in the update job form.
  const handleUpdateInputChange = (e, id) => {
    const { name, value } = e.target;
    setUpdateJob({ ...updateJob, id, [name]: value });
  };

  // Function to handle updating a job.
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
      // Reset update job state and ID after updating.
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

  // Function to toggle the update job form.
  const handleToggleUpdateForm = (id) => {
    setUpdateJobId(updateJobId === id ? null : id);
    if (updateJobId !== id) {
      const jobToUpdate = jobs.find((job) => job._id === id);
      setUpdateJob({ ...jobToUpdate });
    }
  };

  // Function to filter jobs based on status.
  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  // Function to show all jobs by setting the filterStatus to null.
  const handleShowAll = () => {
    setFilterStatus(null);
  };

  // Filter jobs based on selected status.
  const filteredJobs = filterStatus // If the state of filterStatus is true/not null then the jobs state is filtered by the filterStatus.
    ? jobs.filter((job) => job.status === filterStatus)
    : jobs; // Else filteredJobs will just be assigned the jobs state.

  return (
    <>
      <h2>Jobs List</h2>
      {/* Buttons to filter jobs by status. */}
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

      {/* The list of jobs. */}
      <ul>
        {filteredJobs.map((job) => (
          <li key={job._id}>
            <strong>Description:</strong> {job.description}
            <br />
            <strong>Location:</strong> {job.location}
            <br />
            <strong>Priority:</strong> {job.priority}
            <br />
            <strong>Status:</strong> {job.status}
            <br />
            {/* Button to toggle update form. */}
            <button onClick={() => handleToggleUpdateForm(job._id)}>
              Update
            </button>
            {/* Update form. */}
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
                {/* Dropdown menu for selecting priority. */}
                <select
                  name="priority"
                  value={updateJob.priority}
                  onChange={(e) => handleUpdateInputChange(e, job._id)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {/* Dropdown menu for selecting status. */}
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
                {/* Button to save the updated job. */}
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
