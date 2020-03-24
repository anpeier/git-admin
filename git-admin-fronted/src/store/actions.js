import { getClassList } from "./../api/class";
import { getStudentList } from "./../api/students";
export const classActions = {
  getClass({ commit }) {
    getClassList().then(res => {
      commit("saveClassList", res);
    });
  }
};

export const studentActions = {
  getStudents({ commit }, name) {
    getStudentList({
      params: {
        className: name
      }
    }).then(res => {
      commit("saveStuList", res);
    });
  },
  addStudentOne({ commit }, studentInfo) {
    commit("addStudent", studentInfo);
  }
};
