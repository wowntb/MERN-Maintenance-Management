import { useState, useEffect } from "react";
import NewJob from "./NewJob";
import JobsList from "./JobsList";
import ArchivedJobs from "./ArchivedJobs";

function JobManager() {
  const [jobs, setJobs] = useState([]); // State to store jobs data.

  useEffect(() => {
    fetchJobs(); // Fetch jobs data when component mounts or when jobs state changes.
  }, [jobs]); // Dependency array to re-run effect when jobs state changes.

  // Function to fetch jobs data from the API.
  const fetchJobs = async () => {
    try {
      // Send a GET request to fetch jobs data.
      const response = await fetch("/api/jobs");
      if (!response.ok) {
        // Throw an error if response is not OK.
        throw new Error("Failed to fetch jobs");
      }
      // Extract JSON data from the response and update the jobs state.
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      // Log error to console if there's an error fetching data.
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div>
      <h1>Jobs Manager</h1>

      {/* Component to show the "add a job" section/form. */}
      <NewJob />

      {/* Component to display list of jobs. The state of jobs is shared with this component.*/}
      <JobsList jobs={jobs} />
      {/* Component to display the jobs that have been archived. */}
      <ArchivedJobs />
    </div>
  );
}

export default JobManager;
