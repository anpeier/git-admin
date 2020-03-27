const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const db = require("./db/db");

// 跨域
// app.use(
//   cors({
//     origin: ["http://localhost:8080"],
//     credentials: true
//   })
// );

app.use(cors())

// 接收post参数
app.use(
  koaBody({
    multipart: true
  })
);

const users = require("./routes/student.js");
const classes = require("./routes/class.js");
app.use(users.routes());
app.use(classes.routes());

// app.use(router.routes())
// app.use(router.allowedMethods())

app.listen(9240, () => {
  console.log("服务启动在9240端口");
});
