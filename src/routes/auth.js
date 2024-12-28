const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ token: username }); // Token is the password
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
