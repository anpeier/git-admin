const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: String
},{ timestamps: { createdAt: "created", updatedAt: "updated" } })

const Class = mongoose.model("Class", classSchema);
module.exports = Class