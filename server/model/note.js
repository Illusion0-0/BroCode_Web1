const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, default: "Untitled" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  content: String,
  tags: [String],
  isPublic: { type: Boolean, default: false },
});

//Class
const Note = mongoose.model("Note", NoteSchema); //collection name

//export
module.exports = Note;
