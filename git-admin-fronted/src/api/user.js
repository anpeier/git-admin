import http from "./../http";
export const login = userInfo => {
  console.log(userInfo);
  return http.post("/login", { userInfo });
};
