const { Student, Commits } = require("./../models/student");
const { getStuCurEvents } = require("./callGit");
const cron = require("node-cron");
const updateDB = async () => {
  const studentList = await Student.find();

  for (const student of studentList) {
    const lastCommitTime = await Commits.findOne(
      { gitUserName: student.gitUserName },
      { commitDate: 1, _id: 0 }
    ).sort({
      commitDate: -1,
    });
    const res = await getStuCurEvents(student.gitUserName);
    let needInsertData = [];
    needInsertData = res.filter((item) => {
      return (
        Date.parse(item.commitDate) > Date.parse(lastCommitTime.commitDate)
      );
    });
    if (needInsertData.length) {
      await Commits.insertMany(needInsertData);
    }
  }
};

cron.schedule("* * 0 * * *", () => {
  updateDB();
});

module.exports = cron;
