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
        message: "该学生已存在",
        code: 5
      };
    }
  });
  if (isNeedReq) {
    const res = await getGitUserInfo(ctx, gitUsername);
    res.name = ctx.request.body.name;
    const data = await Student.create(res);
    const commitData = await getUserAllEvents(ctx, gitUsername);
    Commits.insertMany(commitData);
    ctx.body = {
      message: "success",
      code: 1
    };
  }
});

usersRouter.get("/list", (ctx, next) => {});

module.exports = usersRouter;
