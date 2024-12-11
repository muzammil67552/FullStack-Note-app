const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) =>{
    try {
        const { title, description } = req.body;

        const newNote = new User({
         title,
         description
        });
        await newUser.save();
    
        return res.status(200).json({ success: true, message: "Account created successfully" });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to create account" });
      }
})

module.exports=router

