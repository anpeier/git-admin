const UserRouter = require("koa-router")();
const User = require("./../models/user");
const addToken = require("./../utils/token/addToken");

UserRouter.post("/login", async (ctx, next) => {
  const res = await User.find(ctx.request.body.userInfo);
  if (res.length) {
    const token = addToken(res[0]);
    ctx.body = {
      code: 1,
      message: "登陆成功",
      data: {
        token
      }
    };
  } else {
    ctx.body = {
      code: -1,
      message: "账号名或密码错误"
    };
  }
});

module.exports = UserRouter;
