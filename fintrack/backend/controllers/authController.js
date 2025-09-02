const authService = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);

  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }

  return res.json(result);
};

module.exports = { login };
