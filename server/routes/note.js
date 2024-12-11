const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const middleware = require("../middleware/middleware");

router.post("/add", middleware, async (req, res) => {
    try {
      console.log("Request body:", req.body); // Log the request body
      const { title, description } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({ success: false, message: "Title and description are required" });
      }
  
      const newNote = new Note({
        title,
        description,
        userId: req.user.id, // Ensure `req.user` is defined
      });
  
      await newNote.save();
      return res.status(200).json({ success: true, message: "Created Successfully" });
    } catch (error) {
      console.error("Error in /add route:", error); // Log the error
      return res.status(500).json({ success: false, message: "Failed to create Note" });
    }
  });
  

module.exports = router;
