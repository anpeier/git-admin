module.exports = app => {
  const logger = require("koa-logger");
  const fs = require("fs");
  app.use(
    logger(str => {
      fs.appendFile("./logger/system.log", str, "utf-8", err => {
        if (err) {
          console.log(err);
        }
      });
    })
  );
};
