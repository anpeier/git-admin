const jwt = require("jsonwebtoken");
const serect = require("./serect");
module.exports = userInfo => {
  const token = jwt.sign(
    {
      username: userInfo.username,
      id: userInfo._id
    },
    serect,
    { expiresIn: 60 * 60 }
  );
  return token;
};
