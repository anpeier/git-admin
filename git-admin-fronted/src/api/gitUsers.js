import axios from "axios";
import { Message } from 'element-ui'
const instance = axios.create({
  timeout: 10000
});

export const searchGitUser = async gitname => {
  let url = `https://api.github.com/search/users?q=${gitname}`;
  let res = await instance.get(url).then(res => {
    return res.data.items;
  }).catch((err) => {
    Message.warning('请求失败，请稍后重试')
  });
  return res;
};
