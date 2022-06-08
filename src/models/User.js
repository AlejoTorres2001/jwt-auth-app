const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 5153,
    },
    Editor: {
      type: Number,
      default: 5152,
    },
    Admin: {
      type: Number,
      default: 5151,
    },
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
