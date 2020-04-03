const baseURl = "https://api.github.com";
const { Commits } = require("./../models/student");
const axios = require("axios");
const instance = axios.create({
  baseURL: "https://api.github.com/",
  // timeout: 5000,
  headers: { Accept: "application/vnd.github.v3+json" }
});

const getGitUserInfo = async (ctx, gitName) => {
  console.log("git:" + gitName);
  let gitname = encodeURI(gitName);
  let res = await instance.get(`/search/users?q=${gitname}`).then(res => {
    return res.data.items[0];
  });
  res = {
    gitUserName: res.login,
    avatar: res.avatar_url,
    git_url: res.url
  };
  return res;
};
const getUserAllEvents = async (ctx, gitName) => {
  let gitname = encodeURI(gitName);
  let data = [],
    isRequest = true,
    i = 1;
  while (isRequest) {
    const res = await instance
      .get(`/users/${gitname}/events?page=${i}&per_page=300`)
      .then(res => {
        if (i == 3) isRequest = false;
        i++;
        let result = res.data.filter(item => item.type == "PushEvent");
        let data = [];
        for (const item of result) {
          let commits = item.payload.commits;
          let commitDate = item.created_at;
          let obj = {
            commits,
            commitDate,
            gitUserName: gitName
          };
          data.push(obj);
        }
        return data;
      });
    data = data.concat(res);
  }
  return data;
};

const getStuCurEvents = async gitUserName => {
  let result = [];
  const res = await instance
    .get(`/users/${gitUserName}/events`)
    .then(res => {
      result = res.data.filter(item => item.type == "PushEvent");
    })
    .catch(error => {
      console.log(error);
      setTimeout(() => {
        getStuCurEvents(gitUserName);
      }, 30 * 60 * 1000);
    });
  let data = [];
  for (const item of result) {
    let commits = item.payload.commits;
    let commitDate = item.created_at;
    let obj = {
      commits,
      commitDate,
      gitUserName
    };
    data.push(obj);
  }
  return data;
};
module.exports = {
  getGitUserInfo,
  getUserAllEvents,
  getStuCurEvents
};
