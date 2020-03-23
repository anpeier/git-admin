const Router = require("koa-router");
const usersRouter = new Router({ prefix: "/students" });
const { Student, Commits } = require("./../models/student");
const { getGitUserInfo, getUserAllEvents } = require("./../utils/callGit");

usersRouter.post("/add", async (ctx, next) => {
  const studentInfo = ctx.request.body;
  console.log(ctx.request.body);
  const gitUserName = studentInfo.gitUserName;
  const name = studentInfo.name;
  const className = studentInfo.className;
  let isNeedReq = true;
  await Student.findOne({ gitUserName: gitUserName }, (err, doc) => {
    // console.log(doc)
    if (doc) {
      isNeedReq = false;
      ctx.body = {
        message: "学生已存在",
        code: 0
      };
    }
  });
  if (isNeedReq) {
    let res = await getGitUserInfo(ctx, gitUserName);
    while (res.length < 0) {
      await setTimeout(async () => {
        res = await getGitUserInfo(ctx, gitUserName);
      }, 300);
    }
    let commitData = await getUserAllEvents(ctx, gitUserName);
    while (commitData.length < 0) {
      await setTimeout(async () => {
        commitData = await getUserAllEvents(ctx, gitUserName);
      }, 300);
    }
    // console.log(commitData);
    if (commitData.length > 0 && res) {
      res.name = name;
      res.lastCommitTime = commitData[0].commitDate;
      res.class_name = className;
      console.log(res);
      await Student.create(res);

      Commits.insertMany(commitData);
      ctx.body = {
        message: "添加成功",
        code: 1
      };
    } else {
      ctx.body = {
        message: "添加失败",
        code: -1
      };
    }
  }
});

usersRouter.get("/studentsList", async (ctx, next) => {
  // console.log(ctx.request.query);
  const className = ctx.request.query.className;
  let data = {};
  if (className) {
    data = await Student.find({ class_name: className });
  } else {
    data = await Student.find();
  }

  if (data.length > 0) {
    ctx.body = {
      message: "success",
      code: 1,
      data
    };
  } else {
    ctx.body = {
      code: -1
    };
  }
});

module.exports = usersRouter;
