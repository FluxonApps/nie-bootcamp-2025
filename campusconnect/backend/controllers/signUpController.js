const signupService = require("../services/signUp");

// exports.signup = async (req, res) => {
//   try {
//     const user = req.body;
//     const savedUser = await signupService.signup(user);
//     if (!savedUser) {
//       return res.status(400).json({ message: "Signup failed, possibly duplicate username." });
//     }
//     res.status(201).json({ message: "User registered successfully", user: savedUser });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



exports.signup = async (req, res) => {
  try {
    const user = req.body;

    // Email pattern check
    const emailPattern = /^20\d{2}[a-z]+_[a-z]+_[a-z]@nie\.ac\.in$/;
    if (!emailPattern.test(user.email)) {
      return res.status(400).json({ message: "Only college email IDs are allowed." });
    }

    const result = await signupService.signup(user);

    // Check for error property in result
    if (result && result.error) {
      return res.status(400).json({ message: result.error });
    }
    if (!result) {
      return res.status(400).json({ message: "Signup failed. Please try again." });
    }

    // Registration successful
    res.status(201).json({ message: "User registered successfully", user: result });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

