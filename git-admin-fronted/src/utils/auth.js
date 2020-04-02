import Cookie from "js-cookie";

const tokenKey = "lv-token";

export const getToken = () => {
  return Cookie.get(tokenKey);
};

export const setToken = token => {
  return Cookie.set(tokenKey, token);
};

export const removeToken = () => {
  return Cookie.remove(tokenKey);
};
