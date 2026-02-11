const loginService = require("../services/login");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginService.login(username, password);

    if (result && result.error) {
      return res.status(401).json({ message: result.error });
    }
    if (!result) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // Send only essential info for proceeding to homepage
res.status(200).json({
  message: "Login successful",
  username: result.username,
  _id: result._id,        // ✅ standard
  userId: result._id,     // ✅ fallback for old code
});


  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
