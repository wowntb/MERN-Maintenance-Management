const express = require("express");
const bodyParser = require("body-parser");
// Import job routes module.
const jobRoutes = require("./routes/jobRoutes");
// Import database configuration.
const mongoose = require("./config/database");

// Create Express application instance.
const app = express();

// Middleware to parse incoming JSON requests.
app.use(bodyParser.json());

// Use job routes.
// Mount job routes under the "/api/jobs" path.
app.use("/api/jobs", jobRoutes);

// Define the port number for the server to listen on.
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
