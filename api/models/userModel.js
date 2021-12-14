const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  photo: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "guide"],
  },
});

userSchema.pre("save", async function (next) {
  // Hash password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePasswords = async function (
  inputPassword,
  userPassword
) {
  const isPasswordCorrect = bcrypt.compare(inputPassword, userPassword);
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
