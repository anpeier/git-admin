const Router = require("koa-router");
const usersRouter = new Router({ prefix: "/students" });
const { Student, Commits } = require("./../models/student");
const { getGitUserInfo, getUserAllEvents } = require("./../utils/callGit");

usersRouter.post("/add", async (ctx, next) => {
  const gitUsername = ctx.request.body.gitUsername;
  let isNeedReq = true;
  await Student.findOne({ gitUserName: gitUsername }, (err, doc) => {
    if (doc) {
      isNeedReq = false;
      ctx.body = {
        code: 11
      };
    }
  });
  if (isNeedReq) {
    let res = await getGitUserInfo(ctx, gitUsername);
    while (res.length < 0) {
      await setTimeout(async () => {
        res = await getGitUserInfo(ctx, gitUsername);
      }, 300);
    }
    let commitData = await getUserAllEvents(ctx, gitUsername);
    while (commitData.length < 0) {
      await setTimeout(async () => {
        commitData = await getUserAllEvents(ctx, gitUsername);
      }, 300);
    }
    // console.log(commitData);
    if (commitData.length > 0 && res) {
      res.name = ctx.request.body.name;
      res.lastCommitTime = commitData[0].commitDate
      await Student.create(res);
      Commits.insertMany(commitData);
      ctx.body = {
        code: 1
      };
    } else {
      ctx.body = {
        code: -1
      };
    }
  }
});

usersRouter.get("/list", async (ctx, next) => {
  const data = await Student.find();
  if (data.length > 0) {
    ctx.body = {
      message: "success",
      code: 1,
      data
    };
  }else {
    ctx.body = {
      code: -1
    }
  }
});

module.exports = usersRouter;
