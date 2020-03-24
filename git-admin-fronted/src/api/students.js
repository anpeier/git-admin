import http from "./../http";
export const addStudent = studentInfo => {
  return http.post("students/add", studentInfo);
};

export const getStudentList = className => {
  return http.get("students/studentsList", className);
};
