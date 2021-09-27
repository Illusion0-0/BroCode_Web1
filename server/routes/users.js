const { User, validate } = require("../model/user");
const errorJson = require("../Operations/errorjson"); //for error json
const auth = require("../middleware/auth"); // for authorization
const bcrypt = require("bcrypt"); // for hashing password
const _ = require("lodash"); // for .pick() method - to pick only the fields that we want to send to the client
const express = require("express");
const router = express.Router(); //const app = express(); can't be used here..

const mongoose = require("mongoose");

//Registering the Users
router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(errorJson(error.details[0].message));

  //Checking if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(errorJson("User already registered"));

  //Creating the new user
  const newUser = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  //Saving the new user
  newUser
    .save()
    .then((user) => {
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .send({ user: _.pick(user, ["_id", "username", "email"]), token });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// //add a note to own profile if not already present
// router.patch("/me/notes/add", auth, async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (!user) return res.status(404).send("User not found");
//   if (user.notes.includes(req.body.note))
//     return res.status(400).send("Note already present");
//   user.notes.push(req.body.note);
//   user.save().then(() => res.send(user.notes));
// });

// //delete a note from own profile if present
// router.patch("/me/notes/delete", auth, async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (!user) return res.status(404).send("User not found");
//   if (!user.notes.includes(req.body.note))
//     return res.status(400).send("Note not present");
//   user.notes.splice(user.notes.indexOf(req.body.note), 1);
//   user.save().then(() => res.send(user.notes));
// });

router.put("/me", auth, async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(errorJson(error.details[0].message));

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );
  if (!user) return res.status(404).send(errorJson("User not found"));
  res.send({ user: _.omit(user, ["password"]) }); //omit the password from the response
});

module.exports = router;
