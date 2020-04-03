const { Student, Commits } = require("./../models/student");
const { getStuCurEvents } = require("./callGit");
const cron = require("node-cron");
const sendEmail = require("./sendEmail");

const updateDB = async () => {
  let studentList = await Student.find();
  for (const student of studentList) {
    const lastCommitTime = await Commits.findOne(
      { gitUserName: student.gitUserName },
      { commitDate: 1, _id: 0 }
    ).sort({
      commitDate: -1,
    });
    const res = await getStuCurEvents(student.gitUserName);
    console.log(res);
    let needInsertData = [];
    needInsertData = res.filter((item) => {
      return (
        Date.parse(item.commitDate) > Date.parse(lastCommitTime.commitDate)
      );
    });
    if (needInsertData.length) {
      await Commits.insertMany(needInsertData);
    } else {
      if (
        Date.now() - Date.parse(lastCommitTime.commitDate) >=
          60 * 60 * 24 * 3 * 1000 &&
        student.email &&
        res.length
      ) {
        console.log(student.email);
        sendEmail(student.email);
      }
    }
  }
};

cron.schedule("00 00 00 * * *", () => {
  updateDB();
});

module.exports = cron;
