const mongoose = require("mongoose");
const uri =
  "mongodb+srv://testuser:testpassword@cluster-1.afrzv5p.mongodb.net/?retryWrites=true&w=majority";

function connectToMongoDB() {
  try {
    // Attempt to connect to MongoDB using the provided URI.
    mongoose.connect(uri);

    // Event handler for successful MongoDB connection.
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB successfully");
    });

    // Event handler for MongoDB connection errors.
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error: ", err);
    });

    // Event handler for MongoDB disconnection.
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
  } catch (error) {
    // Catch any errors that occur during the connection attempt.
    console.error("Error connecting to MongoDB: ", error);
  }
}

module.exports = { connectToMongoDB };
