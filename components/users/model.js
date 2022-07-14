/* jshint esversion: 8 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUND = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(SALT_ROUND, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, (hashError, hash) => {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
