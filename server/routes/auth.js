const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const middleware = require("../middleware/middleware");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    return res.status(200).json({ success: true, message: "Account created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create account" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User does not exist" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({id: user._id}, "secretkeyofnoteapp123@#", {
      expiresIn: "5h",
    })
    
    return res.status(200).json({
      success: true, token,user:{name: user.name}, message:"Login"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
});

router.get('/verify', middleware, async (req, res) =>{
  return res.status(200).json({success:true})
})

module.exports = router;
