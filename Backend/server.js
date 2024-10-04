const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const hydroRoutes = require("./routes/hydroroutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
app.use("/api/hydro", hydroRoutes);
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // This will route to userRoutes.js

// Start the server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
