import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

//Collection schema
const user = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt password
user.pre("save", function (next) {
  var newUser = this;
  // only hash the password if it has been modified (or is new)
  if (!newUser.isModified("email")) return next();

  bcrypt
    .genSalt(3)
    .then((salts) => {
      bcrypt
        .hash(this.email, salts)
        .then((hash) => {
          this.email = hash;
          next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

//Decrypt the key
user.methods.compararPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) return cb(err);
    cb(null, match);
  });
};

module.exports = mongoose.model("dataUser", user);
