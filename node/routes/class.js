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
  const params = ctx.request.query;
  res = await Class.find(params);
  ctx.body = {
    code: 1,
    data: res
  };
});

classRouter.get("/getOneClass", async (ctx, next) => {
  const params = ctx.request.query;
  console.log(params)
  const data = await Class.find(params);
  ctx.body = {
    message: "查询成功",
    code: 1,
    data
  };
});

// classRouter.get("/getClaByName", (ctx, next) => {
//   console.log(ctx.request.query.params)
// })

classRouter.put("/updateClaInfo", async (ctx, next) => {
  const classInfo = ctx.request.body.classInfo;
  const id = classInfo._id;
  const data = await Class.findByIdAndUpdate(
    id,
    { $set: classInfo },
    { new: true }
  );
  ctx.body = {
    code: 1,
    message: "更新成功"
  };
});

module.exports = classRouter;
