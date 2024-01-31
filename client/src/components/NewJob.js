import { useState } from "react";

function NewJob() {
  // State to manage the input values for the new job.
  const [newJob, setNewJob] = useState({
    description: "",
    location: "",
    priority: "High",
    status: "submitted",
  });

  // Function to handle input changes in the form fields.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  // Function to handle adding a new job.
  const handleAddJob = async () => {
    try {
      // Send a POST request to add a new job.
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (!response.ok) {
        // Throw an error if the response is not OK.
        throw new Error("Failed to add job");
      }
      // Reset the form fields after successfully adding the job.
      setNewJob({
        description: "",
        location: "",
        priority: "High",
        status: "submitted",
      });
    } catch (error) {
      // Log an error message if there's an error adding the job.
      console.error("Error adding job:", error);
    }
  };

  return (
    <>
      <h2>Add New Job</h2>
      {/* Input fields for job description, location, and priority. */}
      <input
        type="text"
        name="description"
        value={newJob.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="location"
        value={newJob.location}
        onChange={handleInputChange}
        placeholder="Location"
      />
      {/* Dropdown menu for selecting job priority. */}
      <select
        name="priority"
        value={newJob.priority}
        onChange={handleInputChange}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      {/* Button to add the new job. */}
      <button onClick={handleAddJob}>Add Job</button>
    </>
  );
}

export default NewJob;
