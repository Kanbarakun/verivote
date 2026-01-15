const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { readJSON, writeJSON } = require("../utils/filehandler");

const router = express.Router();
const USERS_FILE = "users.json";
const SECRET = "verivote_secret"; // later move to .env

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const users = readJSON(USERS_FILE);

  const exists = users.find(u => u.email === email);
  if (exists)
    return res.status(409).json({ error: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    hasVoted: false,
    role: "voter"
  });

  writeJSON(USERS_FILE, users);
  res.json({ message: "Registration successful" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = readJSON(USERS_FILE);
  const user = users.find(u => u.email === email);

  if (!user)
    return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});

module.exports = router;
