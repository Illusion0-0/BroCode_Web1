const mongoose = require("mongoose");
const Joi = require("joi"); // for Data validation
Joi.objectId = require("joi-objectid")(Joi); //added extra pakage for objectID chk
const jwt = require("jsonwebtoken"); // for authentication of user and generate token

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    default: "New User",
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    unique: true,
  },
  avatar: {
    type: String,
    //set first letter of username as default avatar
    default: function () {
      return (
        "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" +
        this.username.charAt(0)
      );
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 2048,
  },
  notes: [String],
  favorites: [String],
});

// add generateAuthToken method to the UserSchema
UserSchema.methods.generateAuthToken = function () {
  // generate auth token using id of current user (this)
  const token = jwt.sign({ _id: this._id }, "jwtPrivateKey"); // process.env.TOKEN_SECRET)
  return token;
};

//Class
const User = mongoose.model("User", UserSchema); //collection name

//Validate the User
function validateUser(user) {
  const schema = Joi.object({
    //id: Joi.objectId(),
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(1024).email().required(),
    password: Joi.string().min(5).max(2048).required(),
    notes: Joi.array().items(Joi.string()),
    favourites: Joi.array().items(Joi.string()),
  });
  const { error } = schema.validate(user);
  return error;
}

//Validate the User
function validateUserUpdate(user) {
  const schema = Joi.object({
    notes: Joi.array().items(Joi.string()),
    favorites: Joi.array().items(Joi.string()),
  });
  const { error } = schema.validate(user);
  return error;
}

//export
// module.exports = User;
exports.User = User;
exports.validate = validateUser;
exports.validateUpdate = validateUserUpdate;
