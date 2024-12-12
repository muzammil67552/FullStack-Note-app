const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const middleware = require("../middleware/middleware");

router.post("/add", middleware, async (req, res) => {
    try {
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
  
  router.get('/', async (req,res) =>{
    try {
        const notes = await Note.find()
        res.status(200).json({success:true, notes})
    } catch (error) {
        res.status(500).json({success:true, message:"cant create notes"})
    }
  })

  router.put("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
  
      if (!updatedNote) {
        return res.status(404).json({ success: false, message: "Note not found" });
      }
  
      res.json({ success: true, note: updatedNote });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  });

module.exports = router;
