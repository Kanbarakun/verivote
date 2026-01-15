const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Register works" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login works" });
});

module.exports = router;
