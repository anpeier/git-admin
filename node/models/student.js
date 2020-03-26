const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    gitUserName: {
      type: String,
      require: true,
      index: true
    },
    avatar: String,
    git_url: String,
    class_name: String,
    phoneNum: String,
    email: String,
    lastCommitTime: Date
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

const commitSchema = new mongoose.Schema(
  {
    gitUserName: {
      type: String,
      index: true
    },
    commits: Object,
    commitDate: Date
  },
  { timestamps: { createdAt: "created", updatedAt: "updated" } }
);

const Student = mongoose.model("Student", studentSchema);
const Commits = mongoose.model("Commits", commitSchema);

module.exports = {
  Student,
  Commits
};
