const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
