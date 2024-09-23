import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { SALT } from "../config/server-config.js";
import { SECRET_KEY } from "../config/config.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    const encryptedPassword = await bcrypt.hash(user.password, SALT);
    user.password = encryptedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate() {
  return jwt.sign({id: this._id, email: this.email}, SECRET_KEY, {
    expiresIn: "1h"
  });
}

const User = mongoose.model("User", userSchema);
export default User;
