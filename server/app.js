const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
// Import job routes module.
const jobRoutes = require("./routes/jobRoutes");
// Import database configuration.
const { connectToMongoDB } = require("./config/database");
// Start a connection to the mongo database.
connectToMongoDB();

// Define the port number for the server to listen on.
const PORT = process.env.PORT || 3000;
// Create Express application instance.
const app = express();

// Middleware to improve security.
app.use(helmet());
// Middleware to parse incoming JSON requests.
app.use(bodyParser.json());
// Use job routes.
// Mount job routes under the "/api/jobs" path.
app.use("/api/jobs", jobRoutes);

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
