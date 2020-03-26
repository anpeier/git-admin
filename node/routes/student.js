const Router = require("koa-router");
const usersRouter = new Router({ prefix: "/students" });
const { Student, Commits } = require("./../models/student");
const Class = require("./../models/class");
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

      // console.log(className)
      // 班级人数 加1
      Class.updateOne({ name: className }, { $inc: { stuNum: 1 } }, err => {
        console.log(err);
      });

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

usersRouter.get("/list", async (ctx, next) => {
  const className = ctx.request.query.className;
  console.log(ctx.request.query)
  let data = {},
    total;
  if (className) {
    const res = await Student.find({ class_name: className });
    data.stuList = res;
    data.total = await Student.countDocuments({ class_name: className });
  } else {
    const res = await Student.find();
    data.stuList = res;
    data.total = await Student.countDocuments();
  }
  console.log(data)
  if (data.stuList.length > 0) {
    ctx.body = {
      message: "获取成功",
      code: 1,
      data
    };
  } else {
    ctx.body = {
      code: 0,
      message: "暂无数据"
    };
  }
});

usersRouter.get("/getStuById", async (ctx, next) => {
  const id = ctx.request.query.id;
  const data = await Student.find({ _id: id });
  ctx.body = {
    code: 1,
    data
  };
});

usersRouter.put("/updateStu", async (ctx, next) => {
  const studentInfo = ctx.request.body.studentInfo;
  const id = studentInfo._id;
  const data = await Student.findByIdAndUpdate(
    id,
    { $set: studentInfo },
    { new: true }
  );
  ctx.body = {
    code: 1,
    message: '更新成功'
  }
});

module.exports = usersRouter;
