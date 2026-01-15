const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Vote route works" });
});

module.exports = router;
