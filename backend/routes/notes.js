const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1:get all the notes using :using GET "api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error1");
      }
});

//Route 2: get all the notes using :using POST "api/notes/addnotes". Login required
router.post("/addnotes",fetchuser,[
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 5 }) ]  ,async (req, res) =>
    {
        try {
        const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const note = new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error2");
  } 
  });

  //Route 3: update an existing note using :using PUT "api/notes/updatenote". Login required
router.put("/updatenote/:id",fetchuser,async (req, res) =>{
  try {
  const {title,description,tag}=req.body;
  // create a new note object
  const newNote = {}
  if(title){newNote.title=title};
  if(description){newNote.description=description};
  if(tag){newNote.tag=tag};
  
  // find the note to be update and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("NOT FOUND")}
  if(note.user.toString() !== req.user.id){return res.status(401).send("NOT ALLOWED")}
  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error2");
} 
    });


      //Route 4: deletenote an existing note using :using DELETE "api/notes/deletenote". Login required
router.delete("/deletenote/:id",fetchuser,async (req, res) =>{
  try {
  // find the note to be delete and delete it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("NOT FOUND")}
  // ALLOW deletion only if user own this note
  if(note.user.toString() !== req.user.id){return res.status(401).send("NOT ALLOWED")}
  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"success":"user has been deleted succesfully",note:note});
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error2");
}
    });

module.exports = router;
