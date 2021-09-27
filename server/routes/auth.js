const Joi = require("joi"); // for Data validation
const errorJson = require("../Operations/errorjson"); //for error json
// Joi.objectId = require("joi-objectid")(Joi); //added extra pakage for objectID chk
const { User } = require("../model/user");
const bcrypt = require("bcrypt"); // for hashing password
const _ = require("lodash"); // for .pick() method - to pick only the fields that we want to send to the client
const express = require("express");
const router = express.Router(); //const app = express(); can't be used here..

const mongoose = require("mongoose");

//Authenticate the User
router.post("/", async (req, res) => {
  //validate the data
  const { error } = validate(req.body);
  if (error) return res.status(400).send(errorJson(error.details[0].message));

  //check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(errorJson("Invalid email or password"));

  //check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send(errorJson("Invalid email or password"));

  //return the user if everything is fine
  const token = user.generateAuthToken();
  console.log({ user: _.pick(user, ["_id", "name", "email"]), token });
  res.send({ user: _.pick(user, ["_id", "name", "email"]), token });
});

// router.post("/", async (req, res) => {
//   const error = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   //Checking if the user already exists
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send("User already registered");

//   //Creating the new user
//   const newUser = new User(_.pick(req.body, ["username", "email", "password"]));
//   const salt = await bcrypt.genSalt(10);
//   newUser.password = await bcrypt.hash(newUser.password, salt);

//   //Saving the new user
//   newUser
//     .save()
//     .then((user) => {
//       res.send(_.pick(user, ["_id", "username", "email"]));
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

//Validate the User
function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(1024).email().required(),
    password: Joi.string().min(5).max(2048).required(),
  });
  console.log(schema.validate(user));
  const result = schema.validate(user);
  return result;
}
module.exports = router;
