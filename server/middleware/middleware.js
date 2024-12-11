const jwt = require("jsonwebtoken");
const User = require("../models/User");

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Use optional chaining for safety

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "secretkeyofnoteapp123@#");

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = { name: user.name }; // Attach additional fields as needed
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(500).json({ success: false, message: "Please login first" });
  }
};

module.exports = middleware;
