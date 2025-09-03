const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ROLES } = require("../constants/constant");

// Secret key for JWT (move to .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// GET all users (hide password field)
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const safeUsers = users.map(user => {
      const { password, ...rest } = user.toObject();
      return rest;
    });
    return res.json(safeUsers || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// SIGNUP (add user)
const addUser = async (req, res) => {
  try {
    const { name, username, password, role, address, phone } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: "username, password, and role are required" });
    }

    if (!ROLES.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Allowed roles: ${ROLES.join(", ")}` });
    }

    const existingUser = await userService.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await userService.addUser({
      name,
      username,
      password: hashedPassword,
      role,
      address,
      phone,
    });

    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, addUser, loginUser };
