const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

// Route to create a user
router.post("/createUser", async (req, res) => {
  const { username, password, role, fullName, email } = req.body; // Include new fields

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      username,
      password,
      role,
      fullName, // Add fullName
      email, // Add email
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Route to login a user (optional if you need authentication)
router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body; // userId refers to username
    console.log(req.body);

    // Find user by username
    const user = await User.findOne({ username: userId });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Route to get users
router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find().select("username role fullName email"); // Select specific fields to return
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
});

module.exports = router;
