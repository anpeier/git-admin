const nodemailer = require("nodemailer");
const { sendEmailInfo } = require("./../config");
let transporter = nodemailer.createTransport({
  service: sendEmailInfo.service,
  port: 465,
  secureConnection: true,
  auth: {
    user: sendEmailInfo.sendEmailAuth,
    pass: sendEmailInfo.pass,
  },
});
let mailOptions = {
  from: `anpeier<${sendEmailInfo.sendEmailAuth}>`,
  subject: "好好写代码",
};
const send = (email, stuName) => {
  mailOptions.to = email;
  mailOptions.text = `${stuName},你已经好久没有提交代码了，老喻已经在死命的催你了！`;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    return info.messageId;
  });
};

module.exports = send;
