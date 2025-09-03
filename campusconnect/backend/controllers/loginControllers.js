const loginService = require("../services/loginService");

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
      userId: result._id 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
