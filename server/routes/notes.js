const { User, validate } = require("../model/user");
const errorJson = require("../Operations/errorjson"); //for error json
const auth = require("../middleware/auth"); // for authorization
const Joi = require("joi"); // for Data validation
Joi.objectId = require("joi-objectid")(Joi); //added extra pakage for objectID chk
const express = require("express");
const router = express.Router(); //const app = express(); can't be used here..

const mongoose = require("mongoose");
const NoteOp = require("../Operations/noteOp");
const Note = require("../model/note");

//Get all Notes ( add custom auth middleware for secure access )
router.get("/", auth, (req, res) => {
  User.findById(req.user._id)
    .select("notes")
    .then(async (user) => {
      if (!user.notes || !user.notes.length) return res.send({ notes: [] });
      // create array of objects with only id of notes
      let notes = user.notes.map((note) => {
        return { _id: note };
      });

      notes = await Note.find().or(notes);
      res.send({ notes });
    });
});

/*
  ? --> query params (req.query)
  */
//Get a Note( add custom auth middleware for secure access )
router.get("/:id", auth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send(errorJson("Invalid Note ID"));

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send(errorJson("User not found"));
  if (!user.notes.includes(req.params.id))
    return res.status(400).send(errorJson("Note not present"));

  const where = {
    _id: mongoose.Types.ObjectId(req.params.id),
  };

  NoteOp.getNotes(where).then((note) => {
    if (!note || note.length === 0) {
      return res.status(404).send(errorJson("Note not found"));
    }

    res.send({ note });
  });
});

//Add a Note ( add custom auth middleware for secure access )
router.post("/", auth, (req, res) => {
  //Validate the Data
  const error = validateNote(req.body);
  if (error) {
    return res.status(400).send(errorJson(error.details[0].message));
  }

  const { title, content, tags } = req.body;
  const note = {
    title,
    content,
    tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  NoteOp.createNote(note).then(async (note) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send(errorJson("User not found"));
    if (user.notes.includes(note._id + ""))
      return res.status(400).send(errorJson("Note already present"));
    user.notes.push(note._id + "");
    user.save().then(() => res.send(note));
  });
});

//Update the Note ( add custom auth middleware for secure access )
router.put("/:id", auth, async (req, res) => {
  //Validate the Data
  const error = validateNote(req.body);
  if (error) {
    return res.status(400).send(errorJson(error.details[0].message));
  }

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send(errorJson("User not found"));
  if (!user.notes.includes(req.params.id))
    return res.status(400).send(errorJson("Note not present"));

  //check if note present or not and if present then update
  NoteOp.updateNote(req.params.id, req.body).then((note) => {
    if (!note) {
      return res.status(404).send(errorJson("Note not found"));
    }
    res.send({ note });
  });
});

//Update only Note Content in Collab mode
router.put("/collab/:id", auth, async (req, res) => {
  //Validate the Data
  const error = validateNote(req.body);
  if (error) {
    return res.status(400).send(errorJson(error.details[0].message));
  }

  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).send(errorJson("Note not found"));

  const user = await Note.findById(req.user._id);
  if (!user) return res.status(404).send(errorJson("User not found"));
  if (!user.notes.includes(req.params.id) && !note.isPublic)
    return res.status(400).send(errorJson("Unreachable Note"));

  //check if note present or not and if present then update
  const { content } = req.body;
  NoteOp.updateNote(req.params.id, { content: content }).then((note) => {
    if (!note) {
      return res.status(404).send(errorJson("Note not found"));
    }
    res.send({ note });
  });
});

//Delete Note from User notes and Note collection if its present User notes array and Note collection
router.delete("/:id", auth, async (req, res) => {
  const error = validateNote({ id: req.params.id });
  if (error) {
    return res.status(400).send(errorJson(error.details[0].message));
  }
  //check note whether exist in user notes array or not and if exist then remove it
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send(errorJson("User not found"));
  if (!user.notes.includes(req.params.id))
    return res.status(400).send(errorJson("Note not present"));
  user.notes.splice(user.notes.indexOf(req.params.id), 1);
  user.save();

  //check note whether exist in note collection or not and if exist then remove it
  NoteOp.removeNote(req.params.id).then((note) => {
    if (!note) {
      return res.status(404).send(errorJson("Note not found"));
    }
    res.send({ note });
  });
});

//Validate the Note
function validateNote(note) {
  const schema = Joi.object({
    id: Joi.objectId(),
    title: Joi.string().min(3), //If title given then it must be of min 3 char long
    content: Joi.string().allow(null, ""),
    tags: Joi.array().items(Joi.string()),
    isPublic: Joi.boolean(),
  });
  const { error } = schema.validate(note);
  return error;
}

module.exports = router;
