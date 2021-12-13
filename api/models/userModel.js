const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    validate: [isEmail, "Invalid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  photo: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "guide"],
  },
});

const User = mongoose.Model(userSchema, "User");
module.exports = User;
