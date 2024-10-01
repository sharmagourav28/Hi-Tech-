const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const hydroRoutes = require("./routes/hydroroutes");
const authRoutes = require("./routes/authRoutes");
dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/hydro", hydroRoutes);

// Use the authentication routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API WORKING");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
