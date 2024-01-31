const mongoose = require("mongoose");
const uri =
  "mongodb+srv://testuser:testpassword@cluster-1.afrzv5p.mongodb.net/?retryWrites=true&w=majority";

function connectToMongoDB() {
  mongoose.connect(uri);
}

module.exports = { connectToMongoDB };
