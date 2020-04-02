const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const db = require("./db/db");
const checkToken = require('./utils/token/checkToken')

app.use(cors())

// 接收post参数
app.use(
  koaBody({
    // 文件上传参数
    multipart: true
  })
);
app.use(checkToken)
const student = require("./routes/student.js");
const classes = require("./routes/class.js");
const user = require("./routes/user.js");
app.use(student.routes());
app.use(classes.routes());
app.use(user.routes());

// app.use(router.routes())
// app.use(router.allowedMethods())

app.listen(9240, () => {
  console.log("服务启动在9240端口");
});
