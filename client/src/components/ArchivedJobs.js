import { useState, useEffect } from "react";

function ArchivedJobs() {
  // State variable to hold archived jobs data
  const [archivedJobs, setArchivedJobs] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  // Function to fetch archived jobs data
  const fetchArchivedJobs = async () => {
    try {
      const response = await fetch("/api/jobs/archives"); // Assuming this API route fetches archived jobs data
      if (response.ok) {
        const data = await response.json();
        setArchivedJobs(data);
      } else {
        throw new Error("Failed to fetch archived jobs");
      }
    } catch (error) {
      console.error("Error fetching archived jobs:", error);
    }
  };

  // Fetch archived jobs data when the component mounts
  useEffect(() => {
    fetchArchivedJobs();
  }, []);

  // Function to toggle the display of archived jobs
  const toggleArchivedJobs = () => {
    setShowArchived(!showArchived);
  };

  return (
    <div>
      <h2>Archived Jobs</h2>
      {/* Button to toggle display of archived jobs */}
      <button onClick={toggleArchivedJobs}>
        {showArchived ? "Hide Archived Jobs" : "Show Archived Jobs"}
      </button>
      {/* Display archived jobs if showArchived is true */}
      {showArchived && (
        <ul>
          {archivedJobs.map((job) => (
            <li key={job._id}>
              <strong>Description:</strong> {job.description}
              <br />
              <strong>Location:</strong> {job.location}
              <br />
              <strong>Priority:</strong> {job.priority}
              <br />
              <strong>Status:</strong> {job.status}
              <br />
              <strong>Archived:</strong> {job.archived ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArchivedJobs;
