const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // Fetch only usernames
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

module.exports = router;
