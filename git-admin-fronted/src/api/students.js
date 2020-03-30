import http from "./../http";
const addStudent = studentInfo => {
  return http.post("students/add", studentInfo);
};

const getStudentList = params => {
  return http.get("students/list", { params });
};

const getStuById = params => {
  return http.get("students/getStuById", { params });
};

const updateStu = studentInfo => {
  return http.put("students/updateStu", studentInfo);
};

const getCommits = params => {
  return http.get("students/commits", { params });
};

export { addStudent, getStudentList, getStuById, updateStu, getCommits };
