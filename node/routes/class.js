const Router = require("koa-router");
const classRouter = new Router({ prefix: "/class" });
const Class = require("./../models/class");

classRouter.post("/add", async (ctx, next) => {
  let params = ctx.request.body;
  console.log(params);
  let isNeed = true;
  await Class.findOne({ name: params.name }, async (err, doc) => {
    if (doc) {
      isNeed = false;
      ctx.body = {
        message: "班级已存在",
        code: 0
      };
    }
  });
  if (isNeed) {
    params.stuNum = 0;
    const res = await Class.create(params);
    if (res) {
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

classRouter.get("/list", async (ctx, next) => {
  await Class.find((err, doc) => {
    if (doc.length > 0) {
      ctx.body = {
        code: 1,
        data: doc
      };
    } else {
      ctx.body = {
        message: "暂无数据",
        code: 0
      };
    }
  });
});

module.exports = classRouter;