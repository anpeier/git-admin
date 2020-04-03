const jwt = require("jsonwebtoken");
const serect = require("./serect");

const checkToken = async (ctx, next) => {
  let url = ctx.request.url;
  if (url === "/login") {
    await next();
  } else {
    // token 写在header的 'lv-token'
    const token = ctx.request.header["lv-token"];
    try {
      jwt.verify(token, serect);
      await next();
    } catch (error) {
      ctx.body = {
        code: 10,
        message: "token无效或已过期"
      };
    }
  }
};
module.exports = checkToken;
