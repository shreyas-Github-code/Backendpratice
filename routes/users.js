const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String,
});

// Apply the passport-local-mongoose plugin before creating the model
userSchema.plugin(plm);

const User = mongoose.model("User", userSchema);

module.exports = User;
