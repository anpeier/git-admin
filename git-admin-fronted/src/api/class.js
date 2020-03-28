import http from "./../http";
export const getClassList = () => {
  return http.get("class/list");
};

export const addClass = name => {
  return http.post("class/add", { name });
};

export const getClassBy = params => {
  return http.get("class/getOneClass", { params });
};

export const updateClaInfo = classInfo => {
  return http.put("class/updateClaInfo", classInfo);
};

