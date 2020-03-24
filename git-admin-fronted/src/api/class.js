import http from "./../http";
export const getClassList = () => {
  return http.get("class/list");
};

export const addClass = name => {
  return http.post("class/add", { name });
};
